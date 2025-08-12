const express = require('express');
const router = express.Router();
const contentProgressController = require('../controllers/contentProgressController');

router.get('/content-progresses/:student_code', contentProgressController.getAllContentProgress);
router.get('/content-progress/status/:content_progress_id', contentProgressController.getContentProgressStatus);
router.post('/content-progress', contentProgressController.createContentProgress);
router.put('/content-progress', contentProgressController.updateContentProgress);

module.exports = router;