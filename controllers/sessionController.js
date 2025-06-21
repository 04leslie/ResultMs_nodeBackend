const db = require('../db');

// GET all sessions
exports.getSessions = (req, res) => {
  db.query('SELECT * FROM sessions', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// POST create a new session
exports.createSession = (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ error: "Session name is required" });

  const sql = 'INSERT INTO sessions (name) VALUES (?)';
  db.query(sql, [name], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Session created', id: result.insertId });
  });
};
