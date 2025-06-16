import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim:true
  },
  phone: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    enum:['USER','ADMIN'],
    default: 'USER'
  },
  password: {
    type: String,
    required: [true, 'Please Provide a Password'],
    trim:true,
    minLength:[8, 'Provide atleast 8 digit password '],
    select:false
  },
  resetOtp: {
    type: Number,
    required: [true, 'Please provide a phone number'],
  },
  resetOtpExp: {
    type: Number
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
