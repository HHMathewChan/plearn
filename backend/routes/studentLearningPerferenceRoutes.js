const express = require('express');
const router = express.Router();
const studentLearningPreferenceController = require('../controllers/studentLearningPerferenceController');

router.post('/student-learning-preference', studentLearningPreferenceController.studentLearningPerferenceController);

module.exports = router;
