const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

// GET all sessions
router.get('/', sessionController.getSessions);

// POST create a new session
router.post('/', sessionController.createSession);

module.exports = router;
