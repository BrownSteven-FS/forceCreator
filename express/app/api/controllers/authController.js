const jwt = require("jwt-simple");
const User = require("../models/userModel");
const config = require("../config");

const createToken = (userId) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: userId, iat: timestamp }, config.secret);
};

const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .json({ error: "Please provide your email and password" });
  }

  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ error: "Email already exists" });
    }

    // Good to go to create a user
    const user = new User({
      email,
      password,
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({
      message: "User registration successful",
      token: createToken(user.id),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const token = createToken(user.id);
    res.status(201).json({
      message: "User login successful",
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
