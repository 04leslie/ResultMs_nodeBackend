const db = require('../db');

// GET all levels
exports.getLevels = (req, res) => {
  db.query('SELECT * FROM level', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// POST a new level
exports.createLevel = (req, res) => {
  const { name, session_id } = req.body;

  if (!name || !session_id) {
    return res.status(400).json({ error: 'Missing name or session_id' });
  }

  const sql = 'INSERT INTO level (name, session_id) VALUES (?, ?)';
  db.query(sql, [name, session_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, name, session_id });
  });
};

