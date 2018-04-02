const ViewingRecord = require('../models/ViewingRecord');

exports.createViewingRecord = (req, res) => {
	const viewingRecord = new ViewingRecord();
	const data = req.body;
	// console.log(data);
	viewingRecord.ref = data.id,
	viewingRecord.url = data.url,
	viewingRecord.played = data.played;
	viewingRecord.updated = Date.now();
	viewingRecord.save((err, viewingRecord) => {
		if (err) {
			res.status(406).send('Cannot create viewing record');
		}
		// console.log(viewingRecord);
		res.status(200).json(viewingRecord);
	});
};

exports.showViewingHistory = (req, res, next) => {
	const data = req.query;
	// console.log(data);
	const limit = parseInt(data.limit) || 0;
	const orderBy = data.orderBy || { updated: 'asc' };
	
	ViewingRecord.
		find().
		limit(limit).
		sort(orderBy).
		exec((error, viewingRecords) => {
		if (error) {
			return res.status(406).send(error);
		}
		if (viewingRecords.length > 0) {
			res.status(200).json(viewingRecords);
		} else {
			res.status(204).send('No viewing history found');
		}
	});
};
