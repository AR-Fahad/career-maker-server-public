const { getDb } = require("../db/db");

const getBookings = async (req, res) => {
  const bookingsCollection = await getDb().collection("bookings");
  const result = await bookingsCollection.find().toArray();
  res.send(result);
};

module.exports = { getBookings };
