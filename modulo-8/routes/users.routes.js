import express from 'express';
import * as UserController from '../controllers/users.controller.js';

const router = express.Router();

router.get('/', UserController.listUsers);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;
