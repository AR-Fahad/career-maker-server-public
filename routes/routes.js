const express = require("express");
const {
  getServices,
  setService,
  updateService,
  deleteService,
  getService,
} = require("../controller/services");

const router = express.Router();

// services CRUD
router.get("/services", getServices);
router.get("/services/:id", getService);
router.post("/services", setService);
router.patch("/services/:id", updateService);
router.delete("/services/:id", deleteService);

module.exports = { express, router };
