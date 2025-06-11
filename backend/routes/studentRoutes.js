const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/students', studentController.getAllStudents);
router.post('/students', studentController.registerStudent);
router.post('/students/email', studentController.verifyStudentLogin);

module.exports = router;