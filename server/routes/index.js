const express = require('express');
const router = express.Router();

const videosController = require('../controllers/videos');
const viewingHistoryController = require('../controllers/viewingHistory');
	
router.get('/videos', videosController.getVideos);
router.get('/internal-videos', videosController.getInternalVideos);
router.get('/history', viewingHistoryController.getViewingHistory);
router.post('/history/create', viewingHistoryController.createViewingRecord);

module.exports = router;
