const express = require("express");
const { getServices, setService } = require("../controller/services");

const router = express.Router();

// services CRUD
router.get("/services", getServices);
router.post("/services", setService);

module.exports = { express, router };
