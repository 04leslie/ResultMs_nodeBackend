const db = require('../db');

// GET all levels
exports.getLevels = (req, res) => {
  db.query('SELECT * FROM level', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};
