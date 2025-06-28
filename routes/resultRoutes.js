const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');

router.post('/', resultController.storeResults);

router.get('/student-results', resultController.getResultsByMatricule);
module.exports = router;
