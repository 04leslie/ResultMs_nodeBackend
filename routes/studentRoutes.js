const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/', studentController.addStudents);

router.get('/by-course', studentController.getStudentsByCourse);
module.exports = router;
