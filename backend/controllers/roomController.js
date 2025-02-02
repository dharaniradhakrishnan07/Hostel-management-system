const Room = require('../models/Room');

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.allocateRoom = async (req, res) => {
  const { roomNumber, residentId } = req.body;

  try {
    const room = await Room.findOne({ roomNumber });
    if (room && room.isAvailable) {
      room.residentId = residentId;
      room.isAvailable = false;
      await room.save();
      res.json(room);
    } else {
      res.status(400).json({ msg: 'Room not available' });
    }
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
