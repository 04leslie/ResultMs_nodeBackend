const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

// GET all departments
router.get('/', departmentController.getDepartments);

// POST create department
router.post('/', departmentController.createDepartment);

// Route to fetch by facultyId & levelId
router.get('/', departmentController.getDepartmentsByFacultyAndLevel);

// Get departments by level ID
router.get('/by-level/:levelId', departmentController.getDepartmentsByLevel);

module.exports = router;
