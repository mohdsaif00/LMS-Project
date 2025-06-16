import UserModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { mailer } from '../utils/nodemailer.js';
import dotenv from 'dotenv';
dotenv.config();

//Register
export async function register(req, res) {
  const { name, email, password, phone } = req.body;

  if (!email || !name || !password || !phone) {
    return res.status(401).json({
      message: 'Please provide the details',
      success: false,
      error: true,
    });
  }

  const checkUser = await UserModel.findOne({ email: email });

  if (checkUser) {
    return res.status(402).json({
      message: 'Already registered please login',
      success: false,
      error: true,
    });
  }

  const hashpassword = await bcrypt.hash(password, 10);

  const newUser = await new UserModel({
    name: name,
    email: email,
    phone: phone,
    password: hashpassword,
  });

  await newUser.save();

  // If the User wasn't successfully saved, return an error
  if (!newUser) {
    return res.status(400).json({
      message: 'User not registered',
      success: false,
      error: true,
    });
  }

  return res.status(200).json({
    message: 'User registered successfully',
    error: false,
    success: true,
  });
}

//Login
export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({
      message: 'Please provide the details',
      success: false,
      error: true,
    });
  }

  const user = await UserModel.findOne({ email: email }).select('+password');

  if (!user) {
    return res.status(403).json({
      message: 'User not found. Please register.',
      success: false,
      error: true,
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      message: 'Invalid email or password',
      success: false,
      error: true,
    });
  }

  const token = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  return res.status(200).json({
    message: 'Login successful',
    success: true,
    error: false,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      token: token,
    },
  });
}

// Forgot Password
export async function forgotPassword(req, res) {
  const { email } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: 'If an account exists, an OTP has been sent.',
      success: false,
      error: true,
    });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  user.resetOtp = otp;
  user.resetOtpExp = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
  await user.save();

  await mailer.sendMail({
    from: process.env.SMTP_FROM_MAIL, // Your email address
    to: user.email,
    subject: 'Reset Your Password',
    html: `<h3>Your password reset OTP is: ${otp}</h3>`,
  });

  res.status(200).json({
    message: 'OTP sent to your email.',
    success: true,
    error: false,
  });
}

export async function verifyOtp(req, res) {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({
      message: 'Email and OTP are required',
      success: false,
      error: true,
    });
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: 'User not found',
      success: false,
      error: true,
    });
  }

  // Check if OTP matches and is not expired
  if (user.resetOtp !== Number(otp)) {
    return res.status(400).json({
      message: 'Invalid OTP',
      success: false,
      error: true,
    });
  }

  if (user.resetOtpExp < Date.now()) {
    return res.status(400).json({
      message: 'OTP expired',
      success: false,
      error: true,
    });
  }

  user.resetOtp = null;
  user.resetOtpExp = null;
  await user.save();

  res.status(200).json({
    message: 'OTP verified successfully',
    success: true,
    error: false,
  });
}

// Reset Password
// Step 2: Reset Password after OTP is verified
export async function resetPassword(req, res) {
  const { email, password, confirmPass } = req.body;

  if (!email || !password || !confirmPass) {
    return res.status(400).json({
      message: 'Email, password, and confirm password are required.',
      success: false,
      error: true,
    });
  }

  if (password !== confirmPass) {
    return res.status(400).json({
      message: 'Passwords do not match.',
      success: false,
      error: true,
    });
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: 'User not found.',
      success: false,
      error: true,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user.password = hashedPassword;
  user.resetOtp = undefined;
  user.resetOtpExp = undefined;

  await user.save();

  res.status(200).json({
    message: 'Password successfully updated.',
    success: true,
    error: false,
  });
}
