const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../services/userService');
const { authenticateToken } = require('./middleware/auth');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    
    // Validate required fields
    if (!name) return res.status(400).json({ message: 'Name is required' });
    if (!email) return res.status(400).json({ message: 'Email is required' });
    if (!phone) return res.status(400).json({ message: 'Phone is required' });
    if (!password) return res.status(400).json({ message: 'Password is required' });
    
    const result = await registerUser(name, email, phone, password);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error while registering user:', error);
    res.status(400).json({ message: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;
    
    // Validate required fields
    if (!email) return res.status(400).json({ message: 'Email is required' });
    if (!password) return res.status(400).json({ message: 'Password is required' });
    
    const result = await loginUser(email, password, rememberMe);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error while logging in:', error);
    res.status(401).json({ message: error.message });
  }
});

// Logout user
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    await logoutUser(req.user.id);
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error while logging out:', error);
    res.status(500).json({ message: error.message });
  }
});

// Refresh token
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token is required' });
    }
    
    // This would be implemented in userService
    // const result = await refreshUserToken(refreshToken);
    // res.status(200).json(result);
    
    // For now, just return a mock response
    res.status(200).json({
      success: true,
      data: {
        accessToken: 'new-access-token',
        refreshToken: 'new-refresh-token'
      }
    });
  } catch (error) {
    console.error('Error while refreshing token:', error);
    res.status(401).json({ message: error.message });
  }
});

module.exports = router;