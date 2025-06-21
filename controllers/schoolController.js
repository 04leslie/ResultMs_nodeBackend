const db = require('../db');

// GET all schools
exports.getSchools = (req, res) => {
  db.query('SELECT * FROM school', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};
