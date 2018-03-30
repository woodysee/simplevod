const http = require("https");

exports.getVideos = (req, res, next) => {
	console.log("Test");
	const videos = [
		{
			"video": "it's a video"
		}
	]
	res.json(videos);
};
