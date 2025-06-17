import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    trim: true,
    minLength: [8, 'Provide atleast 8 digit password'],
    select: false,
  },
  phone: {
    type: Number,
    require: true,
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER',
  },
  resetOtp: {
    type: Number,
  },
  resetOtpExp: {
    type: Date,
  },
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;
