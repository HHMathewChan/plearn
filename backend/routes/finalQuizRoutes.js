const express = require('express');
const router = express.Router();
const finalQuizController = require('../controllers/finalQuizController');

router.post('/final-quiz', finalQuizController.finalQuizController);

module.exports = router;