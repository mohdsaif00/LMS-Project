import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
<<<<<<< HEAD
    unique: true,
    lowercase: true,
    trim: true,
=======
>>>>>>> main
  },
  number: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    trim: true,
    minLength: [8, 'Provide atleast 8 digit password'],
    select: false,
  },
  resetOtp: {
    type: Number,
<<<<<<< HEAD
    required: [true, 'Please provide a phone number'],
=======
>>>>>>> main
  },
  resetOtpExp: {
    type: Number,
  },
  resetOtp: {
    type: Number,
  },
  resetOtpExp: {
    type: Date,
  },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePass = async function (inputPass) {
  return await bcrypt.compare(inputPass, this.password);
};

const UserModel = mongoose.model('User', userSchema);
export default UserModel;
