const express = require('express');
const router = express.Router();

const videosController = require('../controllers/videos');
const historiesController = require('../controllers/histories');
	
router.get('/videos', videosController.getVideos);
router.get('/history', videosController.showWatchRecords);
router.post('/history/create', videosController.createWatchRecord);

module.exports = router;
