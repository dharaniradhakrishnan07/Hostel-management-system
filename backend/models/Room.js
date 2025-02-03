const mongoose = require('mongoose');

// Define the schema for a room
const roomSchema = new mongoose.Schema(
  {
    room_name: {
      type: String,
      required: true, // Name is required
      trim: true
    },
    type: {
      type: String,
      enum: ['Standard', 'Deluxe', 'Suite', 'Villa', 'Penthouse', 'Cottage'], // Defines possible types
      required: true
    },
    size: {
      type: Number,
      required: true, // Size in square meters
      min: 1 // Size can't be less than 1 square meter
    },
    capacity: {
      type: Number,
      required: true, // Capacity of people
      min: 1 // Capacity can't be less than 1
    },
    amenities: {
      type: [String], // Array of strings for the amenities
      required: true
    },
    price: {
      type: Number,
      required: true, // Price per night in USD
      min: 0 // Price can't be negative
    },
    is_available: {
      type: Boolean,
      default: true // Whether the room is available for booking
    },
    created_at: {
      type: Date,
      default: Date.now // Automatically set the current date and time
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt fields automatically
  }
);

// Create a model from the schema
const Room = mongoose.model('rooms', roomSchema);

module.exports = Room;
