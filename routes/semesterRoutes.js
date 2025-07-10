const express = require('express');
const router = express.Router();
const semesterController = require('../controllers/semesterController');

router.post('/', semesterController.createSemester);

router.get('/', semesterController.getSemesters);

router.get('/:sessionId', semesterController.getSemestersBySession);


module.exports = router;
