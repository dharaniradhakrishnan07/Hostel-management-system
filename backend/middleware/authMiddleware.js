const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/**
 * Middleware to verify the JWT token and authenticate the user.
 * This middleware will check the token in the Authorization header and verify it.
 */
const authenticateUser = (req, res, next) => {
  // Get the token from the Authorization header (format: "Bearer token")
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If no token is provided, respond with an error
  if (!token) {
    return res.status(401).json({ message: 'Authentication failed. No token provided.' });
  }

  // Verify the token
  try {
    // Use the secret key to verify the token and decode the user payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the user to the request object for further use in controllers
    req.user = decoded.user;

    // Call next() to move to the next middleware or route handler
    next();
  } catch (error) {
    // Handle any errors that occur during verification
    res.status(401).json({ message: 'Authentication failed. Invalid token.' });
  }
};

module.exports = { authenticateUser };
