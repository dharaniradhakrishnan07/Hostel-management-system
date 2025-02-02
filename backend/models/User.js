const mongoose = require('mongoose');

// Define schema for the User model
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'resident',  // Role can be 'resident', 'admin', etc.
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

// Create User model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
