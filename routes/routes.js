const express = require("express");
const {
  getServices,
  setService,
  updateService,
  deleteService,
  getService,
} = require("../controller/services");
const {
  getBookings,
  setBooking,
  updateBooking,
} = require("../controller/bookings");
const { verifyToken } = require("../middleware/verifyToken");

const router = express.Router();

// services CRUD
router.get("/services", getServices);
router.get("/services/:id", getService);
router.post("/services", verifyToken, setService);
router.patch("/services/:id", verifyToken, updateService);
router.delete("/services/:id", verifyToken, deleteService);

// bookings CRUD
router.get("/bookings", verifyToken, getBookings);
router.post("/bookings", verifyToken, setBooking);
router.patch("/bookings/:id", verifyToken, updateBooking);

module.exports = { router };
