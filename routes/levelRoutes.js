const express = require('express');
const router = express.Router();
const levelController = require('../controllers/levelController');

router.get('/', levelController.getLevels);
router.post('/', levelController.createLevel);

module.exports = router;
