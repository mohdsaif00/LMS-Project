import { Router } from 'express';
import { login, logout, register } from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', logout);

export default userRouter;
