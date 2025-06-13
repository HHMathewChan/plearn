const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const platformUserController = require('../controllers/platformUserController');

router.get('/students', studentController.getAllStudents);
router.post('/students', studentController.registerStudent);
router.post('/students/email', studentController.verifyStudentLogin);

router.post('/platform-users/email', platformUserController.verifyPlatformUserLogin);
router.post('/platform-users', platformUserController.registerPlatformUser);

module.exports = router;