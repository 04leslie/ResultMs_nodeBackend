const db = require('../db');

exports.createSemester = (req, res) => {
  const { name, session_id } = req.body;

  if (!name || !session_id) {
    return res.status(400).json({ error: 'Name and session_id are required' });
  }

  const sql = 'INSERT INTO semester (name, session_id) VALUES (?, ?)';
  db.query(sql, [name, session_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Semester created', id: result.insertId });
  });
};

exports.getSemesters = (req, res) => {
  const sql = `SELECT * FROM semester`;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};
exports.getSemestersBySession = (req, res) => {
  const { sessionId } = req.params;

  const sql = `SELECT id, name FROM semester WHERE session_id = ?`;

  db.query(sql, [sessionId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};