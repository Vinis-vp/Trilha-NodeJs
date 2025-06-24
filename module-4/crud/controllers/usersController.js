import { pool } from '../db.js';

export async function getAllUsers(req, res) {
  try {
    const [rows] = await pool.execute('SELECT * FROM users');
    res.json(rows);
  } catch {
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
}

export async function createUser(req, res) {
  const { name } = req.body;
  try {
    const [result] = await pool.execute('INSERT INTO users (name) VALUES (?)', [name]);
    res.status(201).json({ id: result.insertId, name });
  } catch {
    res.status(500).json({ error: 'Failed to create user.' });
  }
}

export async function updateUser(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await pool.execute('UPDATE users SET name = ? WHERE id = ?', [name, id]);
    res.json({ message: 'User updated.' });
  } catch {
    res.status(500).json({ error: 'Failed to update user.' });
  }
}

export async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    await pool.execute('DELETE FROM users WHERE id = ?', [id]);
    res.json({ message: 'User deleted.' });
  } catch {
    res.status(500).json({ error: 'Failed to delete user.' });
  }
}

export async function searchUserByName(req, res) {
  const { name } = req.query;
  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE name = ?', [name]);
    res.json(rows);
  } catch {
    res.status(500).json({ error: 'Search failed.' });
  }
}
    