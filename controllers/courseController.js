const db = require('../db');

// Add a course
exports.createCourse = (req, res) => {
  const { title, code, credit, department_id, level_id, session_id, semester_id } = req.body;

  const sql = `
    INSERT INTO course (title, code, credit, department_id, level_id, session_id, semester_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [title, code, credit, department_id, level_id, session_id, semester_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(201).json({ message: 'Course added successfully', id: result.insertId });
  });
};

// Get all courses with joined data
exports.getCourses = (req, res) => {
  const sql = `
    SELECT course.*, 
      level.name AS level_name,
      sessions.name AS session_name,
      semester.name AS semester_name,
      department.name AS department_name
    FROM course
    JOIN level ON course.level_id = level.level_id
    JOIN sessions ON course.session_id = sessions.id
    JOIN semester ON course.semester_id = semester.id
    JOIN department ON course.department_id = department.id
  `;

  db.query(sql, (err, results) => {
  if (err) {
    console.error("Database query error:", err);
    return res.status(500).json({ error: err.message });
  }
  res.status(200).json(results);
});
};
