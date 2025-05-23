import express from 'express';
import dotenv from 'dotenv';
import { login, register } from '../controllers/auth.controllers.js';

dotenv.config();

const authRouter = express.Router();


authRouter.post('/register', register);

authRouter.post('/login', login);

export default authRouter;
