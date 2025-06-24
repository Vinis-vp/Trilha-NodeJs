import express from 'express';
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  searchUserByName
} from '../controllers/usersController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/search', searchUserByName);

export default router;
