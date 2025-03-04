const express = require('express');
const Room = require('../models/Room');
const Resident = require('../models/Resident');
const router = express.Router();

// Route to allocate a room to a resident
router.post('/allocate-room', async (req, res) => {
  const { roomNumber, residentId } = req.body;

  try {
    // Find the room by roomNumber
    const room = await Room.findOne({ roomNumber });
    
    // Check if the room exists and if it's available
    if (!room || room.status === 'occupied') {
      return res.status(400).send('Room is not available');
    }

    // Allocate the room by setting its status to 'occupied'
    room.status = 'occupied';
    await room.save();

    // Find the resident by residentId
    const resident = await Resident.findById(residentId);
    
    // If the resident is found, assign the room number to them
    if (!resident) {
      return res.status(400).send('Resident not found');
    }

    resident.roomNumber = roomNumber;
    await resident.save();

    res.status(200).send('Room allocated successfully');
  } catch (err) {
    console.error('Error allocating room:', err);
    res.status(500).send('Server error');
  }
});

// Route to fetch all rooms (GET API)
router.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.find();  // Fetch all rooms from the database
    res.status(200).json(rooms);      // Send the rooms as JSON response
  } catch (err) {
    console.error('Error fetching rooms data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to create a new room
router.post('/rooms', async (req, res) => {
  const { room_name, type, size, capacity, amenities, price } = req.body;

  try {
    // Create a new room instance
    const newRoom = new Room({
      room_name,
      type,
      size,
      capacity,
      amenities,
      price
    });

    // Save the new room to the database
    await newRoom.save();

    // Send response back with success message
    res.status(201).json({
      message: 'Room created successfully!',
      room: newRoom
    });
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(400).json({
      message: 'Error creating room',
      error: error.message
    });
  }
});

// A simple test route to verify the server is working
router.get("/", (req, res) => {
  res.json("working..roomRoutes");
});

module.exports = router;
