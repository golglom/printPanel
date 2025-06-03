import express from 'express';
import protect from '../middleware/protect.js';
import { getUsers, addUser, updateUser, deleteUser } from '../controllers/user.controllers.js';

const userRouter = express.Router();

// Get all users
userRouter.get('/', protect, getUsers);

// Add a new user
userRouter.post('/', protect, addUser);

// Update a user
userRouter.put('/:id', updateUser);

// Delete a user
userRouter.delete('/:id', deleteUser);

export default userRouter;
