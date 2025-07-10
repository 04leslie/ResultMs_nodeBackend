const express = require('express');
const router = express.Router();
const levelController = require('../controllers/levelController');

router.get('/:sessionId', levelController.getLevelsBySession);
router.post('/', levelController.createLevel);
router.get('/', levelController.getAllLevels);

module.exports = router;
