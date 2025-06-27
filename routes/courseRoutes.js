const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.post('/', courseController.createCourse);
router.get('/by-dept-session-semester', courseController.getCoursesByDeptSessionSemester);
module.exports = router;