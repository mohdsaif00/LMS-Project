import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";

export async function register(req, res) {
  const { name, email, password, phone } = req.body;

  if (!email || !name || !password || !phone) {
    return res.status(401).json({
      message: "Please provide the details",
      success: false,
      error: true
    })
  }

  const checkUser = await UserModel.findOne({ email: email });

  if (checkUser) {
    return res.json({
      message: "Already registered please login",
      success: false,
      error: true
    })
  }

  const hashpassword = await bcrypt.hash(password, 10)

  const newUser = await new UserModel({
    name: name,
    email: email,
    phone: phone,
    password: hashpassword,
  });

  await newUser.save();

  if (!newUser) {
    return res.status(400).json({
      message: "User not registered",
      success: false,
      error: true
    })
  }
  

  return res.status(200).json({
    message: "User registered successfully",
    error: false,
    success: true
  })
}