// Load environment variables from .env file
require('dotenv').config();

// Import required packages
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Create an Express app
const app = express();

// Use middleware to parse JSON and allow cross-origin requests
app.use(express.json());
app.use(cors());

// Create a MySQL database connection using values from .env
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to MySQL and check for errors
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to MySQL database ✅');
  }
});

// Basic test route
app.get('/', (req, res) => {
  res.send('Result Management API is running...');
});

// Start the server on the port defined in .env
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} 🚀`);
});
//session route
const sessionRoutes = require('./routes/sessionRoutes');
app.use('/api/sessions', sessionRoutes);

//semester route
const semesterRoutes = require('./routes/semesterRoutes');
app.use('/api/semesters', semesterRoutes);

//department route
const departmentRoutes = require('./routes/departmentRoutes');
app.use('/api/departments', departmentRoutes);

//school route
const schoolRoutes = require('./routes/schoolRoutes');
app.use('/api/schools', schoolRoutes);

//level route
const levelRoutes = require('./routes/levelRoutes');
app.use('/api/levels', levelRoutes);

//student route
const studentRoutes = require('./routes/studentRoutes');
app.use('/api/students', studentRoutes);

//student route
const courseRoutes = require('./routes/courseRoutes');
app.use('/api/courses', courseRoutes);
