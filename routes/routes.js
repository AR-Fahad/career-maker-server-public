const express = require("express");
const {
  getServices,
  setService,
  updateService,
} = require("../controller/services");

const router = express.Router();

// services CRUD
router.get("/services", getServices);
router.post("/services", setService);
router.patch("/services/:id", updateService);

module.exports = { express, router };
