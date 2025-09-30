const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Wxcvbn.123", // Correct password
  database: "labes_voice",
});

connection.connect((err) => {
  if (err) {
    console.error("❌ Error connecting:", err.stack);
    return;
  }
  console.log("✅ Connected to labes_voice as id", connection.threadId);
});

module.exports = connection;
