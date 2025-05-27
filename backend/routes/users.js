import express from 'express';
import protect from '../middleware/protect.js';
import { requireRole } from '../middleware/roleMiddleware.js';
import { getUsers, addUser, updateUser, deleteUser } from '../controllers/user.controllers.js';

const userRouter = express.Router();

// Get all users
userRouter.get('/', protect, getUsers);

// Add a new user
userRouter.post('/', protect, requireRole(['admin', 'manager']), addUser);

// Update a user
userRouter.put('/:id', requireRole(['admin', 'manager']), updateUser);

// Delete a user
userRouter.delete('/:id', protect, requireRole(['admin']), deleteUser);

export default userRouter;
