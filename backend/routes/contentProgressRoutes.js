const express = require('express');
const router = express.Router();
const contentProgressController = require('../controllers/contentProgressController');

router.get('/content-progresses/:student_code', contentProgressController.getAllContentProgress);
router.post('/content-progress', contentProgressController.contentProgressController);
router.put('/content-progress', contentProgressController.updateContentProgress);

module.exports = router;