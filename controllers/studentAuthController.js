const db = require('../db');

// POST /api/student/login
exports.loginStudent = async (req, res) => {
  const { matricule } = req.body;

  if (!matricule) {
    return res.status(400).json({ error: 'Matricule is required' });
  }

  try {
    const [rows] = await db.promise().query(
      'SELECT * FROM student WHERE matricule = ?',
      [matricule]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid matricule' });
    }

    // Login successful
    return res.status(200).json({
      message: 'Login successful',
      student: rows[0]
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};
