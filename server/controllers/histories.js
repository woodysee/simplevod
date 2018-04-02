const WatchRecord = require('../models/WatchRecord');

exports.createWatchRecord = (req, res, next) => {
	
};

exports.showWatchRecords = (req, res, next) => {
	WatchRecord.find().limit(50).exec((error, watchRecords) => {
		if (error) return res.status(404).send('Not found');
		res.json(watchRecords);
	});
};
