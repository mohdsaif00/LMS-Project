import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetOtp:{
    type: Number
  },
  resetOtpExp:{
    type: Number``
  }
});

userSchema.pre('save', async function(next) {
  if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
})

userSchema.methods.comparePass = async function (inputPass) {
  return await bcrypt.compare(inputPass, this.password) 
}

const UserModel = mongoose.model('User', userSchema);
export default UserModel;
