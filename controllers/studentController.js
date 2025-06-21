const db = require('../db'); // assumes db.js is your database connection

exports.addStudents = (req, res) => {
  const students = req.body;

  console.log("Received students:", students);

  if (!Array.isArray(students) || students.length === 0) {
    return res.status(400).json({ error: 'No student data provided' });
  }

  const values = students.map(student => [
    student.matricule,
    student.name,
    student.email,
    student.contact,
    student.level_id,
    student.depart_id
  ]);

  const sql = `
  INSERT INTO student (matricule, name, email, contact, level_id, depart_id)
  VALUES ?
`;

  db.query(sql, [values], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Students added successfully', inserted: result.affectedRows });
  });
};
