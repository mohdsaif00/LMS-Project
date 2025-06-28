import { Router } from 'express';
import {
  register,
  login,
  logout,
  forgotPassword,
  verifyOtp,
  resetPassword,
  changePassword,
  createOrder,
} from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', isAuthenticated, logout);
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/verify-otp', verifyOtp);
userRouter.post('/reset-password', resetPassword);
userRouter.post('/change-password', isAuthenticated, changePassword);
userRouter.post('/create-order', createOrder);

export default userRouter;
