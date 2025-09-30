const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctor.controller");

// === REGISTER a new doctor ===
router.post("/register", doctorController.createDoctor);

// === LOGIN ===
router.post("/login", doctorController.login);

module.exports = router;
