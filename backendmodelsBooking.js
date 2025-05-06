const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  customerName: String,
  service: String,
  date: String,
  time: String,
  address: String,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed'],
    default: 'pending',
  },
});

module.exports = mongoose.model('Booking', BookingSchema);
