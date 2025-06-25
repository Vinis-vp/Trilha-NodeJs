import express from 'express';
import dotenv from 'dotenv';
import { pool } from './db.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.pageTitle = 'My App';
  next();
});

app.get('/', async (req, res) => {
  try {
    const [users] = await pool.execute('SELECT * FROM users');
    res.render('users', { users });
  } catch (err) {
    res.render('error', { message: 'Failed to load users.' });
  }
});

app.get('/form', (req, res) => {
  res.render('form', { error: null });
});

app.post('/form', async (req, res) => {
  const { name } = req.body;
  if (!name || name.trim().length === 0) {
    return res.render('form', { error: 'Name is required.' });
  }
  try {
    await pool.execute('INSERT INTO users (name) VALUES (?)', [name]);
    res.redirect('/');
  } catch (err) {
    res.render('error', { message: 'Failed to insert user.' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
