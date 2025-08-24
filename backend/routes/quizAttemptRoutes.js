const express = require('express');
const router = express.Router();
const quizAttemptController = require('../controllers/quizAttemptController');

router.post('/quiz-attempt', quizAttemptController.quizAttemptController);

module.exports = router;