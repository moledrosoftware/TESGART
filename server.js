const express = require('express');
const { Pool } = require('pg');
const multer = require('multer');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const app = express();
const nodemailer = require('nodemailer');

require('dotenv').config();

app.use(express.json());
app.use(cors());

const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true,
    optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));

app.use(session({
    secret: 'TeSgArT-SeCrEt',
    resave: false,
    saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const testDbConnection = async () => {
    try {
        const client = await pool.connect();
        client.release();
        console.log('Connected to database');
    } catch (err) {
        console.error('Error connecting to database:', err);
    }
};
testDbConnection();

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD 
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

app.get('/admin', (req, res) => {
    if (req.session.loggedIn) {
        res.sendFile(path.join(__dirname, 'public', 'admin.html'));
    } else {
        res.sendFile(path.join(__dirname, 'public', 'login.html'));
    }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    if (username === 'admin' && password === 'secret') {  
        req.session.loggedIn = true;  
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});



app.get('/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No products found' });
        }
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Error loading products' });
    }
});

app.post('/products', upload.single('image'), async (req, res) => {
    const { name, description } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    if (!image_url) {
        return res.status(400).json({ error: 'Image is required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO products (name, description, image_url) VALUES ($1, $2, $3) RETURNING *',
            [name, description, image_url]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error creating product:', err);
        res.status(500).json({ error: 'Error creating product' });
    }
});

app.put('/products/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const currentProductResult = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        if (currentProductResult.rowCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const currentProduct = currentProductResult.rows[0];
        const updatedName = name || currentProduct.name;
        const updatedDescription = description || currentProduct.description;

        const result = await pool.query(
            'UPDATE products SET name = $1, description = $2, image_url = COALESCE($3, image_url) WHERE id = $4 RETURNING *',
            [updatedName, updatedDescription, image_url, id]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).json({ error: 'Error updating product' });
    }
});

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

app.get('/messages', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM messages ORDER BY date DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Error receiving messages' });
    }
});

app.delete('/messages/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM messages WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.status(204).end();
    } catch (err) {
        console.error('Error deleting message:', err);
        res.status(500).json({ error: 'Error deleting message' });
    }
});

// Route for handling contact form submissions
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const mailOptions = {
        from: email, 
        to: process.env.EMAIL, 
        subject: `New message from ${name}`,
        text: `
            Name: ${name}
            Email: ${email}
            Message: ${message}
        `
    };

    try {
        await transporter.sendMail(mailOptions);

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



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});
