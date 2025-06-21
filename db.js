const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Create connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,     // Your database server address, usually 'localhost'
  user: process.env.DB_USER,     // Your MySQL username, e.g., 'root'
  password: process.env.DB_PASS, // Your MySQL password
  database: process.env.DB_NAME  // Your database name, e.g., 'result_ms_db'
});

module.exports = db;
