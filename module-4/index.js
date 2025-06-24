import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

app.use(express.json());
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
});

app.post('/users', async (req, res) => {
  const { name } = req.body;
  try {
    const [result] = await pool.execute('INSERT INTO users (name) VALUES (?)', [name]);
    res.status(201).json({ id: result.insertId, name });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user.' });
  }
});

app.put('/users/:id', async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  try {
    await pool.execute('UPDATE users SET name = ? WHERE id = ?', [name, id]);
    res.json({ message: 'User updated.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user.' });
  }
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.execute('DELETE FROM users WHERE id = ?', [id]);
    res.json({ message: 'User deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user.' });
  }
});

app.get('/users/search', async (req, res) => {
  const { name } = req.query;
  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE name = ?', [name]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Search failed.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
