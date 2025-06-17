import { Router } from 'express';
import { 
  register, 
  login, 
  logout, 
  forgotPassword, 
  verifyOtp, 
  resetPassword 
} from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', logout);
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/verify-otp', verifyOtp);
userRouter.post('/reset-password', resetPassword);

export default userRouter;