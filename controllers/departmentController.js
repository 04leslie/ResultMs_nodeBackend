const db = require('../db');

// ✅ GET all departments
exports.getDepartments = (req, res) => {
  const sql = `
    SELECT department.*, school.name AS faculty, level.name AS level
    FROM department
    JOIN school ON department.school_id = school.id
    JOIN level ON department.level_id = level.level_id

  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

exports.createDepartment = (req, res) => {
 console.log("Received data:", req.body);

  const { name, dept_code, school_id, level_id, session_id } = req.body;

  if (!name || !dept_code || !school_id || !level_id || !session_id) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const insertSql = `
    INSERT INTO department (school_id, level_id, dept_code, name, session_id)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(insertSql, [school_id, level_id, dept_code, name, session_id], (err, result) => {
    if (err) {
         console.error("DB Error:", err);
        return res.status(500).json({ error: err.message });
  }
    const insertedId = result.insertId;

    const fetchSql = `
      SELECT department.*, school.name AS faculty, level.name AS level
      FROM department
      JOIN school ON department.school_id = school.id
      JOIN level ON department.level_id = level.level_id
      WHERE department.id = ?
    `;

    db.query(fetchSql, [insertedId], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json(rows[0]); // Return the full department info
    });
  });
};

exports.getDepartmentsByFacultyLevelSession = (req, res) => {
  const { facultyId, levelId, sessionId } = req.query;

  if (!facultyId || !levelId || !sessionId) {
    return res.status(400).json({ error: 'facultyId, levelId, and sessionId are required' });
  }

  const sql = `
    SELECT department.*, school.name AS faculty, level.name AS level, session.name AS session
    FROM department
    JOIN school ON department.school_id = school.id
    JOIN level ON department.level_id = level.level_id
    JOIN session ON department.session_id = session.id
    WHERE department.school_id = ? AND department.level_id = ? AND department.session_id = ?
  `;

  db.query(sql, [facultyId, levelId, sessionId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

exports.getDepartmentsByLevel = (req, res) => {
  const levelId = req.params.levelId;

  const sql = `SELECT * FROM department WHERE level_id = ?`;

  db.query(sql, [levelId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};
