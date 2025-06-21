const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

// GET all departments
router.get('/', departmentController.getDepartments);

// POST create department
router.post('/', departmentController.createDepartment);

// Route to fetch by facultyId & levelId
router.get('/', departmentController.getDepartmentsBySchoolAndLevel);
module.exports = router;
