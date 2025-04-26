const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
const registerUser = async (name, email, phone, password) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const user = new User({
    name,
    email,
    phone,
    password: hashedPassword,
    firstLogin: true
  });

  await user.save();

  // Generate JWT token
  const accessToken = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return {
    accessToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      firstLogin: user.firstLogin
    }
  };
};

// Login user
const loginUser = async (email, password, rememberMe = false) => {
  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  // Generate JWT tokens
  const accessToken = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: rememberMe ? '7d' : '1h' }
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '30d' }
  );

  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      firstLogin: user.firstLogin
    }
  };
};

// Logout user
const logoutUser = async (userId) => {
  // In a real implementation, you might want to invalidate tokens
  // For now, we'll just return success
  return { success: true };
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser
};