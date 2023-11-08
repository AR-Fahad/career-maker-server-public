const { getDb } = require("../db/db");

const getBookings = async (req, res) => {
  const bookingsCollection = await getDb().collection("bookings");
  const result = await bookingsCollection.find().toArray();
  res.send(result);
};

const setBooking = async (req, res) => {
  const booking = req.body;
  const bookingsCollection = await getDb().collection("bookings");
  const result = await bookingsCollection.insertOne(booking);
  res.send(result);
};

module.exports = { getBookings, setBooking };
