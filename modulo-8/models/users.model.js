import { db } from '../config/db.js';

export async function getAllUsers(offset = 0, limit = 10, name = '') {
  const [rows] = await db.query(
    `SELECT * FROM users WHERE name LIKE ? LIMIT ? OFFSET ?`,
    [`%${name}%`, limit, offset]
  );
  return rows;
}

export async function createUser({ name, email }) {
  const [result] = await db.query(
    `INSERT INTO users (name, email) VALUES (?, ?)`,
    [name, email]
  );
  return result.insertId;
}

export async function updateUser(id, { name, email }) {
  await db.query(`UPDATE users SET name = ?, email = ? WHERE id = ?`, [
    name,
    email,
    id,
  ]);
}

export async function deleteUser(id) {
  await db.query(`DELETE FROM users WHERE id = ?`, [id]);
}
