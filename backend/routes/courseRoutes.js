const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.get('/courses/metadata', courseController.getAllCoursesMetadata);

module.exports = router;