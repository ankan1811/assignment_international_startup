const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const {
  signupValidation,
  loginValidation,
} = require("../validations/validation");
const dotEnv = require("dotenv");
dotEnv.config();
// Register a new user
const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  const { error } = signupValidation(req.body);
  // console.log("..");
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user and generate JWT
const loginUser = async (req, res) => {
  const { error } = loginValidation(req.body);
  // console.log("..");
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    }); //token expires in 1 hour
    res.status(200).json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const dashboardcontent = async (req, res) => {
  // Content based on user's role
  try {
    const content =
      req.header("role") === "admin"
        ? "Admin Dashboard Content as you are an admin"
        : "User Dashboard Content as you are an user";
    res.status(200).json({ content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  dashboardcontent,
};
