import express from 'express';
import protect from '../middleware/protect.js';
import authorizeRole from '../middleware/roleMiddleware';
import { getUsers, addUser, updateUser, deleteUser } from '../controllers/user.controllers.js';

const userRouter = express.Router();

// Get all users
userRouter.get('/', protect, getUsers);

// Add a new user
userRouter.post('/', protect, authorizeRole('admin'), addUser);

// Update a user
userRouter.put('/:id', protect, authorizeRole('admin'), updateUser);

// Delete a user
userRouter.delete('/:id', protect, authorizeRole('admin'), deleteUser);

export default userRouter;
