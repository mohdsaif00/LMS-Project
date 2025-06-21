import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
const userSchema = new mongoose.Schema({
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
    required: [true, 'Please Provide a Password'],
    trim: true,
    minLength: [8, 'Provide atleast 8 digit password '],
    select: false,
  },
  phone: {
    type: Number,
    required: true,
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

userSchema.methods = {
  generateJwtToken: async function () {
    return await jwt.sign(
      {
        id: this._id,
        email: this.email,
        name: this.name,
        token:this.token,
        role: this.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY || '24h',
      }
    );
  }
};

const UserModel = mongoose.model('User', userSchema);
export default UserModel;
