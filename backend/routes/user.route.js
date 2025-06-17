import { Router } from 'express';
import {
  register,
  login,
  forgotPassword,
  verifyOtp,
  logout,
  resetPassword
} from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/verify-otp', verifyOtp);
userRouter.post('/logout', logout);
userRouter.post('/reset-password', resetPassword);

export default userRouter;
