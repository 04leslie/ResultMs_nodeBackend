const express = require('express');
const router = express.Router();
const semesterController = require('../controllers/semesterController');

// POST /api/semesters
router.post('/', semesterController.createSemester);

module.exports = router;
