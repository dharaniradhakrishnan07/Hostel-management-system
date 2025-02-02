const mongoose = require('mongoose');

const residentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  roomNumber: { type: String, required: true },
  checkInDate: { type: Date, default: Date.now },
  emergencyContact: String,
});

module.exports = mongoose.model('Resident', residentSchema);
