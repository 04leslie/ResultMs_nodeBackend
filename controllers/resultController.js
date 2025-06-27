const db = require('../db'); // Adjust path if needed

// POST /api/results - save results for multiple students
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
    s.matricule,
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


