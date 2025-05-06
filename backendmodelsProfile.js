const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: String,
  photo: String,
  services: [String],
  experience: String,
  rate: Number,
  phone: String,
  whatsapp: String,
});

module.exports = mongoose.model('Profile', ProfileSchema);
