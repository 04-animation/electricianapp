const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/electrician_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

const Booking = require('./models/Booking');
const Profile = require('./models/Profile');

app.get('/profile', async (req, res) => {
  const profile = await Profile.findOne();
  res.json(profile);
});

app.post('/book', async (req, res) => {
  const booking = new Booking(req.body);
  await booking.save();
  res.json({ message: 'Booking created', booking });
});

app.get('/bookings', async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

app.patch('/bookings/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
  res.json({ message: 'Status updated', booking });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
