const uuidv4 = require('uuid/v4');
const ViewingRecord = require('../models/ViewingRecord');

exports.createViewingRecord = (req, res) => {
	const viewingRecord = new ViewingRecord();
	const data = req.body;
	// console.log(data);
	if (typeof data.ref === "undefined") {
		res.status(403).send({status: 403, error: '403: Missing reference for adding viewing record, i.e. `ref`.'});
		return;
	}
	if (typeof data.url === "undefined") {
		res.status(403).send({status: 403, error: '403: Missing video URL, i.e. `url`.'});
		return;
	}
	if (typeof data.played === "undefined") {
		res.status(403).send({status: 403, error: "Missing video watched percentage, i.e. `played`."});
		return;
	}
	viewingRecord.id = uuidv4();
	viewingRecord.ref = data.ref,
	viewingRecord.url = data.url,
	viewingRecord.played = data.played;
	viewingRecord.video = data.video;
	viewingRecord.updated = Date.now();
	// console.log(viewingRecord);
	viewingRecord.save((err, viewingRecord) => {
		if (err) {
			res.status(406).send({status: 406, error: err});
			return;
		}
		
		// console.log(viewingRecord);
		res.status(200).json(viewingRecord);
		res.end();
	});
};

exports.getViewingHistory = (req, res, next) => {
	const data = req.query;
	// console.log(data);
	const limit = parseInt(data.limit) || 0;
	const orderBy = data.orderBy || { updated: 'desc' };
	
	ViewingRecord.
		find().
		populate({
			path: 'videos',
			select: 'name'
		}).
		limit(limit).
		sort(orderBy).
		exec((error, viewingRecords) => {
			if (error) {
				res.status(406).json({status: 406, error: error});
				return;
			}
			console.log(viewingRecords);
			if (viewingRecords.length > 0) {
				res.status(200).json(viewingRecords);
				res.end();
			} else {
				res.status(204).send({status: 204, error: "No viewing record found."});
				return;
			}
		}
	);
};
