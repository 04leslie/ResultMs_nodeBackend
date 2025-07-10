const db = require('../db');
const bcrypt = require('bcrypt');


exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.promise().query(
      "SELECT * FROM admins WHERE email = ? AND is_active = 1",
      [email]
    );

    const admin = rows[0];
    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials or account not active." });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password." });
    }

    res.status(200).json({ message: "Login successful", admin });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
};


exports.addAdmin = async (req, res) => {
  const { name, role, email, password } = req.body;

  if (!name || !role || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if admin with the email already exists
    const [existing] = await db.promise().query("SELECT * FROM admins WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: "An account with this email already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new admin with is_active set to 1 (active)
    await db.promise().query(
      "INSERT INTO admins (name, role, email, password, is_active) VALUES (?, ?, ?, ?, 1)",
      [name, role, email, hashedPassword]
    );

    res.status(201).json({ message: "Admin added successfully." });
  } catch (error) {
    console.error("Error adding admin:", error);
    res.status(500).json({ message: "Server error." });
  }
};