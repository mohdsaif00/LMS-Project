// Import User Model from files
import UserModel from '../models/user.model.js';
// Import Nodemailer configuration to send emails
import transfer from '../config/nodemailer.js';
// Import bcrypt for password hashing
import bcrypt from 'bcryptjs';
// Import jsonwebtoken to generate authentication tokens
import jwt from 'jsonwebtoken';
import { mailer } from '../utils/nodemailer.js';
import dotenv from 'dotenv';
dotenv.config();


/**
 * REGISTER
 * ------------------------------------------------------------------------------
 * Allows a new user to register.
 */
export async function register(req, res) {
  // Extract details from the request body
  const { name, email, password, phone } = req.body;

  // Check if any required field is missing
  if (!email || !name || !password || !phone) {
    return res
      .status(401)
      .json({ message: 'Please provide the details', success: false, error: true });
  }

  // Check if a user already exists with this email
  const checkUser = await UserModel.findOne({ email: email });

  // If the user already exists, send back an error
  if (checkUser) {
    return res
      .status(402)
      .json({ message: 'Already registered please login', success: false, error: true });
  }

  // Hash the password with 10 rounds of salting
  const hashpassword = await bcrypt.hash(password, 10);

  // Create a new User with the hashed password
  const newUser = await new UserModel({ name, email, phone, password: hashpassword });

  // Save the User in the database
  await newUser.save();

  // If the User wasn't successfully saved, return an error
  if (!newUser) {
    return res.status(400).json({ message: 'User not registered', success: false, error: true });
  }

  // Otherwise, return a success message
  return res
    .status(200)
    .json({ message: 'User registered successfully', error: false, success: true });
}


/**
 * LOGIN
 * ------------------------------------------------------------------------------
 * Allows a registered user to login.
 */
export async function login(req, res) {
  // Extract credentials from the request body
  const { email, password } = req.body;

  // Check if both fields are provided
  if (!email || !password) {
    return res
      .status(401)
      .json({ message: 'Please provide the details', success: false, error: true });
  }

// Look for the User in the database by email
  const user = await UserModel.findOne({ email: email }).select('+password');

  // If User is not found, send back an error
  if (!user) {
    return res
      .status(403)
      .json({ message: 'User not found. Please register.', success: false, error: true });
  }

  // Compare password with hashed password in the database
  const isMatch = await bcrypt.compare(password, user.password);

  // If password is incorrect, send back an error
  if (!isMatch) {
    return res
      .status(400)
      .json({ message: 'Invalid email or password', success: false, error: true });
  }

  // If password is correct, generate a JWT token with User's email and id
  const token = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  // Send back the User's details and the token
  return res
    .status(200)
    .json({
      message: 'Login successful',
      success: true,
      error: false,
      user: { id: user._id, name: user.name, email: user.email, token },
    });
}

/**
 * LOGOUT
 * ------------------------------------------------------------------------------
 * Logs the User out by clearing cookies.
 */
export async function logout(req, res) {
  // UserId should be present in the request (after authentication)
  const userId = req.userId;

  // If UserId is not present, send back a message
  if (!userId) {
    return res.json({ msg: 'please provide id' });
  }

  // Prepare cookie options to clear it
  const cookieOption = {
    httpOnly: true,
    source: process.env.NODE_ENV,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 100,
  };

  // Clear the 'accessToken' cookie
  res.clearCookie('accessToken', cookieOption);
}

/**
 * FORGOT PASSWORD
 * ------------------------------------------------------------------------------
 * Sends a password reset OTP to user's email.
 */
export async function forgotPassword(req, res) {
  // Get the email from the request
  const { email } = req.body;

  // Look for the User in the database by email
  const user = await UserModel.findOne({ email });

  // If User not found, send back an error
  if (!user) {
    return res.status(404).json({ message: 'User Not Found' });
  }

  // Generate a 6-digits OTP
  const otp = Math.floor(100000 + Math.random() * 900000);

  // Set OTP and its expiration in the User's document
  user.resetOtp = otp;
  user.resetOtpExp = Date.now() + 10 * 60 * 1000; // 10 minutes from now
  await user.save();

  // Send the OTP to the User's email
  await transfer.sendMail({
    to: user.email,
    subject: 'Your Password Reset Code',
    text: `Your Password Reset Code Is ${otp}`,
  });

  // Send back a success message
  res.json({ message: 'OTP sent to your email' });
}

/**
 * RESET PASSWORD
 * ------------------------------------------------------------------------------
 * Allows User to reset password using the OTP.
 */
export async function resetPassword(req, res) {
  // Extract details from the request
  const { email, otp, password, confirmPass } = req.body;

  // Check if password and confirm password match
  if (password !== confirmPass) {
    return res.status(400).json({ message: 'Passwords do not match!' });
  }

  // Look for User by email and OTP
  const user = await UserModel.findOne({ email, resetOtp: otp });

  // If User or OTP is invalid
  if (!user) {
    return res.status(400).json({ message: 'Invalid OTP or Email' });
  }

  // If OTP has expired
  if (user.resetOtpExp < Date.now()) {
    return res.status(400).json({ message: 'OTP has expired' });
  }

  // Update password and clear the reset fields
  user.password = password;
  user.resetOtp = undefined;
  user.resetOtpExp = undefined;

  // Save the updated User
  await user.save();

  // Send back a success message
  res.json({ message: 'Password successfully changed' });
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
