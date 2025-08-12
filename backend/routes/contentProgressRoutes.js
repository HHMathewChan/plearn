const express = require('express');
const router = express.Router();
const contentProgressController = require('../controllers/contentProgressController');

router.get('/:student_code', contentProgressController.getAllContentProgress);
router.get('/status/:content_progress_id', contentProgressController.getContentProgressStatus);
router.post('/', contentProgressController.createContentProgress);
router.put('/complete', contentProgressController.completeContentProgress);

module.exports = router;