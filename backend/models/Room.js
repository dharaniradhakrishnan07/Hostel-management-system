const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  status: { type: String, default: 'available' }, // "available" or "occupied"
});

module.exports = mongoose.model('Room', roomSchema);
