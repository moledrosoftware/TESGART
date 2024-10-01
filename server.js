const express = require('express');
const { Pool } = require('pg');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const basicAuth = require('express-basic-auth');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Storage configuration for uploaded images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

// Database connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Test database connection
const testDbConnection = async () => {
    try {
        const client = await pool.connect();
        console.log('Successful connection to the database');
        client.release();
    } catch (err) {
        console.error('Error connecting to database:', err);
    }
};

testDbConnection();

// Disable caching
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

// Basic authentication for admin panel
const adminUsers = {};
adminUsers[process.env.ADMIN_USER] = process.env.ADMIN_PASSWORD;

app.use('/admin', basicAuth({
    users: adminUsers,
    challenge: true,
    unauthorizedResponse: 'Unauthorized access',
}));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Retrieve messages
app.get('/messages', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM messages ORDER BY date DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Error receiving messages' });
    }
});

// Retrieve products
app.get('/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'There are no products yet' });
        }
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Error loading products' });
    }
});

app.post('/products', upload.single('image'), async (req, res) => {
    const { name, description, price } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const result = await pool.query(
            'INSERT INTO products (name, description, price, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, description, price, image_url]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error creating product:', err);
        res.status(500).json({ error: 'Error creating product' });
    }
});


app.put('/products/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    // Checking if a new image has been uploaded
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        // Get the current image and product data
        const currentProductResult = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        if (currentProductResult.rowCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const currentProduct = currentProductResult.rows[0];
        const currentImageUrl = currentProduct.image_url;

    
        const updatedName = name || currentProduct.name;
        const updatedDescription = description || currentProduct.description;
        const updatedPrice = price || currentProduct.price; 

        const result = await pool.query(
            'UPDATE products SET name = $1, description = $2, price = $3, image_url = COALESCE($4, $5) WHERE id = $6 RETURNING *',
            [updatedName, updatedDescription, updatedPrice, image_url, currentImageUrl, id]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).json({ error: 'Error updating product' });
    }
});



// Delete product
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(204).end();
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ error: 'Error deleting product' });
    }
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});




// Route for login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Checking for user existence
    if (adminUsers[username] && adminUsers[username] === password) {
        
        res.status(200).send('Successful login');
    } else {
        res.status(401).send('Incorrect username or password');
    }
});

// Nodemailer setup for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail', // или другой SMTP-сервис
    auth: {
        user: process.env.EMAIL, // Почта компании
        pass: process.env.PASSWORD // Пароль приложения для почты компании
    }
});

// Route for handling contact form submissions
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const mailOptions = {
        from: email, // Отправитель
        to: process.env.EMAIL, // Электронная почта компании
        subject: `New message from ${name}`,
        text: `
            Name: ${name}
            Email: ${email}
            Message: ${message}
        `
    };

    try {
        // Отправка письма на почту компании
        await transporter.sendMail(mailOptions);

        // Сохранение сообщения в базу данных
        const result = await pool.query(
            'INSERT INTO messages (name, email, message, date) VALUES ($1, $2, $3, NOW()) RETURNING *',
            [name, email, message]
        );

        res.status(200).json({ message: 'Your message has been sent and saved successfully!' });
    } catch (err) {
        console.error('Error sending email or saving message:', err);
        res.status(500).json({ message: 'Failed to send message or save to database' });
    }
});



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});
