const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");
const User = require("../models/userModel");
dotEnv.config();

async function authenticateUser(req, res, next) {
  // Get token from header or other sources (e.g., cookies, query parameters)
  const token = req.header("Authorization");
  // console.log(token);

  // Check if token is present
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.TOKEN_SECRET
    ); // Replace with your actual secret key

    // Attach user payload to the request object
    req.user = decoded;

    // req.user = await User.findOneById(decoded.userId);

    // Continue with the next middleware or route handler
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
}

function authorizeUser(req, res, next) {
  // Check if user has the 'user' role
  console.log(req.user);
  if (req.user && req.header("role") === "user") {
    next();
  } else {
    res.status(403).json({ message: "Forbidden - User role required" });
  }
}

function authorizeAdmin(req, res, next) {
  // Check if user has the 'admin' role
  if (req.user && req.header("role") === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Forbidden - Admin role required" });
  }
}

module.exports = {
  authenticateUser,
  authorizeUser,
  authorizeAdmin,
};
