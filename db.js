// db.js
const mysql = require("mysql2");

// Database connection details
const db = mysql.createConnection({
  host: "database-1.c78c0mikitzr.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "animesh1994",
  port: "3306",
  database: "animesh1",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to the database.");
});

module.exports = db;
