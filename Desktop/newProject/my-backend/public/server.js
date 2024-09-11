const express = require('express');
const { Pool } = require('pg');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path'); // Добавьте эту строку

// Загрузка переменных окружения
dotenv.config();

const app = express();
app.use(express.json());

// Настройка подключения к базе данных PostgreSQL
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Настройка Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

// Настройка статических файлов
app.use(express.static(path.join(__dirname, 'public')));

// CRUD для товаров
app.get('/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Ошибка при получении товаров' });
    }
});

app.post('/products', async (req, res) => {
    const { name, description, price } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *',
            [name, description, price]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Ошибка при создании товара' });
    }
});

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    try {
        const result = await pool.query(
            'UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *',
            [name, description, price, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Ошибка при обновлении товара' });
    }
});

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Продукт не найден' });
        }
        res.status(204).end(); // Успешное удаление, без содержимого ответа
    } catch (err) {
        console.error('Ошибка при удалении товара:', err);
        res.status(500).json({ error: 'Ошибка при удалении товара' });
    }
});

// Отправка сообщения и сохранение в базе данных
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        // Сохранение сообщения в базе данных
        const result = await pool.query(
            'INSERT INTO messages (name, email, message) VALUES ($1, $2, $3) RETURNING *',
            [name, email, message]
        );

        // Отправка письма продавцу
        const mailOptions = {
            from: email,
            to: process.env.EMAIL,
            subject: 'Новое сообщение от клиента',
            text: `Имя: ${name}\nEmail: ${email}\nСообщение: ${message}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ error: 'Не удалось отправить письмо' });
            }
            res.status(200).json({ message: 'Сообщение отправлено и сохранено', savedMessage: result.rows[0] });
        });
    } catch (err) {
        res.status(500).json({ error: 'Ошибка при сохранении сообщения' });
    }
});

// Получение сообщений в админ-панели
app.get('/messages', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM messages ORDER BY date DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Ошибка при получении сообщений' });
    }
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
