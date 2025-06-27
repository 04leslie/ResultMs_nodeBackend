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

// GET /api/courses/by-dept-session-semester
exports.getCoursesByDeptSessionSemester = (req, res) => {
  const { departmentId, levelId, sessionId, semesterId } = req.query;

  if (!departmentId || !levelId || !sessionId || !semesterId) {
    return res.status(400).json({ error: "All parameters are required." });
  }

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
    WHERE course.department_id = ? AND course.level_id = ? AND course.session_id = ? AND course.semester_id = ?
  `;

  db.query(sql, [departmentId, levelId, sessionId, semesterId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

