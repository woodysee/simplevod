const https = require("https");
const Video = require('../models/Video');

exports.getVideos = (req, res, next) => {
	// console.log("getVideos(): Gets video data and metadata from external API.");
	
	const options = {
		"method": "GET",
		"hostname": "demo2697834.mockable.io",
		"port": 443,
		"path": "/movies",
		"headers": {
			"content-type": "application/json"
		}
	};
	
	const externalRequest = https.request(options, (externalResponse) => {
		// console.info("Source: For further development, refer to https://docs.nodejitsu.com/articles/advanced/buffers/how-to-use-buffers/");
		console.log("statusCode: ", externalResponse.statusCode);
		console.log("headers: ", externalResponse.headers);
		
		const buffers = [];
		
		externalResponse.on('data', (buffer) => {
			buffers.push(buffer);
		});
		
		externalResponse.on('end', () => {
			const videosListBuffer = Buffer.concat(buffers);
			const videosList = JSON.parse(videosListBuffer.toString());
			// console.log(videosList);
			res.json(videosList);
			// console.log(body.toString());
		});
		
	});
	
	externalRequest.on('error', (err) => {
		console.error(`Error: Could not get list of videos from ${err.hostname}`);
		console.error(err);
	});

	externalRequest.end();

};

exports.getInternalVideos = (req, res, next) => {
	// console.log("getInternalVideos(): Gets video data and metadata from internal database.");
	const data = req.query;
	// console.log(data);
	const limit = parseInt(data.limit) || 0;
	const orderBy = data.orderBy || { title: 'asc' };
	Video.
		find().
		limit(limit).
		sort(orderBy).
		exec((error, videos) => {
			if (error) {
				return res.status(406).send(error);
			}
			if (videos.length > 0) {
				res.status(200).json(videos);
			} else {
				res.status(204).send('No internal videos found');
			}
		});
}
