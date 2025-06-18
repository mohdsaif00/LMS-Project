import { Router } from 'express';
<<<<<<< HEAD
import { register, login, logout, forgotPassword, verifyOtp, resetPassword } from '../controllers/user.controller.js';
=======
import { 
  register, 
  login, 
  logout, 
  forgotPassword, 
  verifyOtp, 
  resetPassword 
} from '../controllers/user.controller.js';
>>>>>>> 424e8922a63aca601bde57a113f26f52f37c5330

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', logout);
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/verify-otp', verifyOtp);
userRouter.post('/reset-password', resetPassword);

export default userRouter;