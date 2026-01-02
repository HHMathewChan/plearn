const express = require('express');
const router = express.Router();
const courseContentController = require('../controllers/courseContentController');

// Course content routes
router.get('/:courseId/course-contents', courseContentController.getCourseContentByCourseId);
router.get('/course-contents/:contentId', courseContentController.getCourseContentById);
router.get('/course-contents/:contentId/signed-url', courseContentController.getSignedContentUrl);
router.get('/course-materials/*contentUrl', courseContentController.getCourseMaterialUrl);

module.exports = router;