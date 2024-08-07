const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

// Crear el pool de conexiones
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "kevin",
  password: process.env.DB_PASSWORD || "k01164186",
  database: "filippo",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();
