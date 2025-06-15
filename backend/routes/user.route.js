import { Router } from 'express';
import { forgotPassword, login, logout, register, resetPassword } from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', logout);
userRouter.post('/forgot-password', forgotPassword)
userRouter.post('/reset-password', resetPassword)

export default userRouter;
