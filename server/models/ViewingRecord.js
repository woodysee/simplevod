const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
const Schema = mongoose.Schema;

const viewingRecordSchema = new Schema({
	id: { type: String },
	ref: { type: String },
	url: { type: String },
	played: { type: Number, min: 0, max: 1 },
	updated: { type: Date, default: Date.now },
	video: [Schema.Types.Mixed]
}, { collection: 'viewingHistory' });

const ViewingRecord = mongoose.model('User', viewingRecordSchema);
module.exports = ViewingRecord;
