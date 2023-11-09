const { ObjectId } = require("mongodb");
const { getDb } = require("../db/db");

const getBookings = async (req, res) => {
  if (
    req.query?.u !== req.decoded.email &&
    req.query?.p !== req.decoded.email
  ) {
    return res.status(403).send("forbidden");
  }

  let query = {};
  if (req.query?.u) {
    query = { user: req.query.u };
  }

  if (req.query?.p) {
    query = { provider: req.query.p };
  }
  const bookingsCollection = await getDb().collection("bookings");
  const result = await bookingsCollection.find(query).toArray();
  res.send(result);
};

const setBooking = async (req, res) => {
  const booking = req.body;
  const bookingsCollection = await getDb().collection("bookings");
  const result = await bookingsCollection.insertOne(booking);
  res.send(result);
};

const updateBooking = async (req, res) => {
  const updatedBooking = req.body;
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const updatingBooking = {
    $set: {
      status: updatedBooking.status,
    },
  };
  const bookingsCollection = await getDb().collection("bookings");
  const result = await bookingsCollection.updateOne(query, updatingBooking);
  res.send(result);
};

module.exports = { getBookings, setBooking, updateBooking };
