const express = require('express');
const Room = require('../models/Room');
const Resident = require('../models/Resident');
const router = express.Router();

// Route to allocate a room to a resident
router.post('/allocate', async (req, res) => {
  const { roomNumber, residentId } = req.body;

  const room = await Room.findOne({ roomNumber });
  if (!room || room.status === 'occupied') {
    return res.status(400).send('Room is not available');
  }

  room.status = 'occupied';
  await room.save();

  const resident = await Resident.findById(residentId);
  resident.roomNumber = roomNumber;
  await resident.save();

  res.status(200).send('Room allocated successfully');
});

// New route to fetch all rooms (GET API)
router.get('/getRooms', async (req, res) => {
  try {
    const rooms = await Room.find();  // Fetch all rooms from the database
    res.status(200).json(rooms);      // Send the rooms as JSON response
  } catch (err) {
    console.error('Error fetching rooms data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get("/",(req,res)=>{res.json("working..roomRoutes")})
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

module.exports = router;
