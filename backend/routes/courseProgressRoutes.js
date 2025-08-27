const express = require('express');
const router = express.Router();
const { CourseProgressController } = require('../controllers/courseProgressController');

router.post('/course-progress', CourseProgressController);

module.exports = router;