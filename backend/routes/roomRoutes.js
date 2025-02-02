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

module.exports = router;