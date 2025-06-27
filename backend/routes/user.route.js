import { Router } from 'express';
import {
  register,
  login,
  logout,
  forgotPassword,
  verifyOtp,
  resetPassword,
  changePassword,
  getProfile,
  updateProfile,
} from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';
const auth = require("../middlewares/auth.middleware.js")

const userRouter = Router();

router.post("/activate-access", async (req, res) => {
  const { userId, paymentId } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.isPaidUser = true;
  user.paymentId = paymentId;
  await user.save();

  res.status(200).json({ message: "Access activated successfully" });
});

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', isAuthenticated, logout);
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/verify-otp', verifyOtp);
userRouter.post('/reset-password', resetPassword);
userRouter.post('/change-password', isAuthenticated, changePassword);
userRouter.get('/profile', auth, getProfile)
userRouter.put('/profilr', auth, updateProfile)

export default userRouter;
