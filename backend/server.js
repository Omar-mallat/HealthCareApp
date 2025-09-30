const express = require("express");
const app = express();
const db = require("./models");
const doctorRoutes = require("./routes/doctor.route");
const cors = require("cors");

const PORT = 3000;

app.use(express.json());
app.use(cors());

// Sync database
db.sequelize
  .sync()
  .then(() => console.log("✅ Database synced"))
  .catch((err) => console.error("❌ Database sync failed:", err));

// Routes
app.use("/api/doctors", doctorRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
