const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const platformUserController = require('../controllers/platformUserController');

router.get('/students', studentController.getAllStudents);
router.post('/students', studentController.registerStudent);
router.post('/students/email', studentController.verifyStudentLogin);

// Uncomment the following lines when user management is implemented
// router.get('/users', userController.getAllUsers);
// router.post('/users', userController.registerUser);
router.post('/platform-users/email', platformUserController.verifyPlatformUserLogin);

module.exports = router;