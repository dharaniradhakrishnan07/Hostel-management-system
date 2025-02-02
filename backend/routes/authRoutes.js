const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure the path is correct
const dotenv = require('dotenv');
const router = express.Router();

dotenv.config();

// Route for logging in and issuing a JWT token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate inputs
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password' });
  }

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the hashed password with the plain-text password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // If the password matches, create a JWT token
    const token = jwt.sign(
      { user: { id: user._id, email: user.email } },
      process.env.JWT_SECRET,  // Ensure you have the JWT_SECRET in your .env file
      { expiresIn: '1h' } // Token will expire in 1 hour
    );

    // Respond with the token
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
