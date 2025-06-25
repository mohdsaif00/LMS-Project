import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

expo//Authentication for Loged in
const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized: No token provided please login',
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

//Check role
const authorizedRole = (...roles) => {
  return async (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({
        message: 'You do not have permission to add course.',
        success: false,
        error: true,
      });
    }

    next();
  };
};

//Check if user is logged in
const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only access" });
  }
  next();
};

module.exports = { protect, isAdmin };

export { isAuthenticated, authorizedRole };
