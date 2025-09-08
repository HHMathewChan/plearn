const express = require('express');
const router = express.Router();
const personaliseLearningController = require('../controllers/personaliseLearningController');

router.post('/recommend-courses/', personaliseLearningController.recommendCourses);

module.exports = router;