const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

const Schema = mongoose.Schema;

const watchRecordSchema = new mongoose.Schema({
	ref: String,
	url: String,
	played: { type: Number, min: 0, max: 1 },
	updated: { type: Date, default: Date.now },
});

const WatchRecord = mongoose.model('User', watchRecordSchema);
module.exports = WatchRecord;
