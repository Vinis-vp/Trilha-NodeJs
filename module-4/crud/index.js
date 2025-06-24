import express from 'express';
import dotenv from 'dotenv';
import usersRoutes from './routes/users.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/users', usersRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
