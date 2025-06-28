const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');

// Send a new complaint
router.post('/', complaintController.sendComplaint);

// Get all complaints (admin)
router.get('/', complaintController.getAllComplaints);

// Get complaints by student matricule
router.get('/:matricule', complaintController.getComplaintsByStudent);

// Reply to a complaint
router.post('/reply/:id', complaintController.replyToComplaint);

module.exports = router;
