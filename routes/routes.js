const express = require("express");
const {
  getServices,
  setService,
  updateService,
  deleteService,
  getService,
} = require("../controller/services");
const { getBookings } = require("../controller/bookings");

const router = express.Router();

// services CRUD
router.get("/services", getServices);
router.get("/services/:id", getService);
router.post("/services", setService);
router.patch("/services/:id", updateService);
router.delete("/services/:id", deleteService);

// bookings CRUD
router.get("/bookings", getBookings);

module.exports = { express, router };
