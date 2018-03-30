const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home');
	
router.get('/api/videos', homeController.getVideos);

module.exports = router;
