const express = require('express');
const router = express.Router();
const enrolmentController = require('../controllers/enrolmentController');

router.get('/:student_code/enrolled-courses', enrolmentController.getEnrolledCoursesByStudentCode);

module.exports = router;