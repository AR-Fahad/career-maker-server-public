const express = require("express");
const { getServices } = require("../controller/services");

const router = express.Router();

// services CRUD
router.get("/services", getServices);

module.exports = { express, router };
