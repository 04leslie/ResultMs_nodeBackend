const express = require('express');
const router = express.Router();
const semesterController = require('../controllers/semesterController');

// POST /api/semesters
router.post('/', semesterController.createSemester);

router.get('/', semesterController.getSemesters);

module.exports = router;
