const db = require('../db');

// Send a complaint (student)
exports.sendComplaint = async (req, res) => {
  const { student_matricule, complaint_text } = req.body;

  if (!student_matricule || !complaint_text) {
    return res.status(400).json({ error: 'Matricule and complaint text are required.' });
  }

  try {
    const sql = "INSERT INTO complaints (student_matricule, complaint_text) VALUES (?, ?)";
    await db.promise().query(sql, [student_matricule, complaint_text]);
    res.status(201).json({ message: 'Complaint sent successfully.' });
  } catch (error) {
    console.error('Error sending complaint:', error);
    res.status(500).json({ error: 'Failed to send complaint.' });
  }
};

// Get all complaints (admin view)
exports.getAllComplaints = async (req, res) => {
  try {
    const sql = "SELECT * FROM complaints ORDER BY created_at DESC";
    const [results] = await db.promise().query(sql);
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ error: 'Failed to fetch complaints.' });
  }
};

// Get complaints by student matricule (student view)
exports.getComplaintsByStudent = async (req, res) => {
  const { matricule } = req.params;

  try {
    const sql = "SELECT * FROM complaints WHERE student_matricule = ? ORDER BY created_at ASC";
    const [results] = await db.promise().query(sql, [matricule]);
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching student complaints:', error);
    res.status(500).json({ error: 'Failed to fetch student complaints.' });
  }
};

// Admin replies to a complaint
exports.replyToComplaint = async (req, res) => {
  const { id } = req.params;
  const { reply } = req.body;

  if (!reply) {
    return res.status(400).json({ error: 'Reply message is required.' });
  }

  try {
    const sql = "UPDATE complaints SET reply = ?, status = 'replied' WHERE id = ?";
    await db.promise().query(sql, [reply, id]);
    res.status(200).json({ message: 'Reply sent successfully.' });
  } catch (error) {
    console.error('Error replying to complaint:', error);
    res.status(500).json({ error: 'Failed to send reply.' });
  }
};
