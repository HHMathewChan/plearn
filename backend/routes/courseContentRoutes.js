const express = require('express');
const router = express.Router();
const courseContentController = require('../controllers/courseContentController');

// Course content routes
router.get('/:courseId/course-contents', courseContentController.getCourseContentByCourseId);
router.get('/course-contents/:contentId', courseContentController.getCourseContentById);

module.exports = router;