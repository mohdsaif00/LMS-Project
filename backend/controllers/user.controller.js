import UserModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';

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

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({
      message: 'Please provide the details',
      success: false,
      error: true,
    });
  }

  const user = await UserModel.findOne({ email: email });

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

  return res.status(200).json({
    message: 'Login successful',
    success: true,
    error: false,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
}
