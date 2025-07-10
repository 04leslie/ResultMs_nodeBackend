const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin login
router.post('/login', adminController.loginAdmin);

// Admin creation 
router.post('/admins/create', adminController.addAdmin);

module.exports = router;
