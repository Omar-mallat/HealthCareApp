const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const { Doctor } = db;

const SECRET_KEY = process.env.JWT_SECRET || "labes_voice_secret_key_2024";

// === LOGIN ===
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ where: { email } });

    if (!doctor) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: doctor.doctor_id,
        email: doctor.email,
        name: doctor.name,
      },
      SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      doctor: {
        id: doctor.doctor_id,
        name: doctor.name,
        email: doctor.email,
        specialization: doctor.specialization,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// === CREATE DOCTOR ===
exports.createDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const existingDoctor = await Doctor.findOne({ where: { email } });
    if (existingDoctor) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = await Doctor.create({
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        email: doctor.email,
      },
      SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Doctor created successfully",
      token,
      doctor: {
        email: doctor.email,
      },
    });
  } catch (err) {
    console.error("Create doctor error:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};
