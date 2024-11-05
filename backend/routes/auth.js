// backend/routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// Login route
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Successful login
    res.status(200).json({ message: 'Login successful!' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during login' });
  }
});

module.exports = router;
