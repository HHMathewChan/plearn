/**
 * @fileoverview This file defines the routes for enrolment-related operations.
 */
const express = require('express');
const router = express.Router();
const enrolmentController = require('../controllers/enrolmentController');

router.post('/enrolments', enrolmentController.enrols);
router.post('/enrolment', enrolmentController.enrolmentUsecase);

module.exports = router;