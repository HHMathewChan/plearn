const express = require('express');
const router = express.Router();
const enrolmentController = require('../controllers/enrolmentController');
const studentController = require('../controllers/studentController');

router.get('/:studentCode/enrolled-courses', enrolmentController.getEnrolledCoursesByStudentCode);
router.get('/:studentCode/profile', studentController.getStudentProfileForRecommendations);

module.exports = router;