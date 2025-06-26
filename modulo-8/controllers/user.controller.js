import * as UserModel from '../models/users.model.js';
import { userSchema } from '../validators/user.validator.js';

export async function listUsers(req, res) {
  const { page = 1, limit = 10, name = '' } = req.query;
  const offset = (page - 1) * limit;
  const users = await UserModel.getAllUsers(offset, +limit, name);
  res.json(users);
}

export async function createUser(req, res) {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  const id = await UserModel.createUser(req.body);
  res.status(201).json({ id });
}

export async function updateUser(req, res) {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  await UserModel.updateUser(req.params.id, req.body);
  res.status(200).json({ message: 'User updated' });
}

export async function deleteUser(req, res) {
  await UserModel.deleteUser(req.params.id);
  res.status(200).json({ message: 'User deleted' });
}
