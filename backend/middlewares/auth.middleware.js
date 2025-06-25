import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized: No token provided',
      success: false,
      error: true,
    });
  }

  try {
    const userDetails = jwt.verify(token, process.env.JWT_SECRET);
    req.user = userDetails;
    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Unauthorized: Invalid token',
      success: false,
      error: true,
    });
  }
};
