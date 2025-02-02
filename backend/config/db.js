const mongoose = require('mongoose');
require('dotenv').config();  // To load environment variables from .env file

// Function to establish the MongoDB connection
const connectDB = async () => {
  try {
    // Getting the MongoDB URI from environment variables
    const mongoURI = process.env.MONGODB_URI;  // Update to MONGODB_URI to match your .env file
    
    // Connecting to MongoDB using Mongoose
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1);  // Exit process if connection fails
  }
};

module.exports = connectDB;
