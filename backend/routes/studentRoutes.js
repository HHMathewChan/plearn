const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/all', studentController.getAllStudents);

module.exports = router;