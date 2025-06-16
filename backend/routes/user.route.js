import { Router } from 'express';
import {
<<<<<<< HEAD
  login,
  register,
  forgotPassword,
  resetPassword,
  verifyOtp,
=======
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
>>>>>>> main
} from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
<<<<<<< HEAD
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/verify-otp', verifyOtp);
=======
userRouter.post('/logout', logout);
userRouter.post('/forgot-password', forgotPassword);
>>>>>>> main
userRouter.post('/reset-password', resetPassword);

export default userRouter;
