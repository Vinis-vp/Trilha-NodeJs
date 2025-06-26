const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const cors = require('cors');
const csurf = require('csurf');
const sqlite3 = require('sqlite3').verbose();
const { body, validationResult } = require('express-validator');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;
const SECRET = 'segredo-jwt';

const db = new sqlite3.Database(':memory:');

app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'segredo-sessao',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly: true }
}));

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

const csrfProtection = csurf({ cookie: true });

db.serialize(() => {
  db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    password TEXT,
    role TEXT
  )`);

  db.run(`INSERT INTO users (email, password, role) VALUES 
    ('admin@email.com', '123456', 'admin'),
    ('user@email.com', '123456', 'user')`);
});

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET, { expiresIn: '1h' });
}

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user?.role === role) {
      return next();
    }
    return res.status(403).json({ message: 'Acesso negado' });
  };
}

app.post('/login', body('email').isEmail(), body('password').isLength({ min: 6 }), (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, user) => {
    if (err) return res.status(500).json({ error: 'Erro no servidor' });
    if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

    const token = generateToken(user);
    req.session.user = { id: user.id, email: user.email, role: user.role };
    res.cookie('token', token, { httpOnly: true, secure: false });
    res.json({ token });
  });
});

app.get('/admin', authenticateJWT, authorizeRole('admin'), (req, res) => {
  res.json({ message: 'Bem-vindo admin!' });
});

app.get('/form', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.post('/form', csrfProtection, (req, res) => {
  res.json({ message: 'Requisição protegida por CSRF' });
});

app.get('/user/:email', (req, res) => {
  const email = req.params.email;
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
    if (err) return res.status(500).send('Erro interno');
    if (!row) return res.status(404).send('Usuário não encontrado');
    res.json(row);
  });
});

app.post('/ataque', (req, res) => {
  res.status(403).json({ message: 'CSRF bloqueado com sucesso!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
