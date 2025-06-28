const db = require('../db'); // Adjust path if needed

// POST /api/results, save results for multiple students
exports.storeResults = async (req, res) => {
  const { students } = req.body;

  if (!Array.isArray(students) || students.length === 0) {
    return res.status(400).json({ error: 'No result data provided.' });
  }

  const insertQuery = `
    INSERT INTO result (
      student_matricule, course_id, department_id, level_id, session_id, semester_id,
      ca_mark, exam_mark, total, avg, grade, grade_point, evaluation, observation
    )
    VALUES ?
  `;

  const values = students.map(s => [
    s.student_matricule,
    s.course_id,
    s.department_id,
    s.level_id,
    s.session_id,
    s.semester_id,
    s.ca_mark,
    s.exam_mark,
    s.total,
    s.avg,
    s.grade,
    s.grade_point,
    s.evaluation,
    s.observation
  ]);

  try {
    const [result] = await db.promise().query(insertQuery, [values]);
    res.status(201).json({ message: 'Results saved successfully', inserted: result.affectedRows });
  } catch (error) {
    console.error('Error inserting results:', error);
    res.status(500).json({ error: 'Failed to save results.' });
  }
}

// GET /api/result/student-results?matricule=...&sessionId=...&semesterId=...
exports.getResultsByMatricule = async (req, res) => {
  const { matricule, sessionId, semesterId } = req.query;

  if (!matricule || !sessionId || !semesterId) {
    return res.status(400).json({ error: 'Missing matricule, sessionId, or semesterId' });
  }

  try {
    const [results] = await db.promise().query(`
      SELECT 
        r.*, 
        c.title AS course_name, 
        c.code AS course_code, 
        c.credit
      FROM result r
      JOIN course c ON r.course_id = c.id
      WHERE r.student_matricule = ? 
        AND r.session_id = ? 
        AND r.semester_id = ?
    `, [matricule, sessionId, semesterId]);

    res.json(results);
  } catch (error) {
    console.error("Error fetching student results:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

