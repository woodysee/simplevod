const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
	title: {
		type: String
	},
	description: {
		type: String
	},
	type: {
		type: String
	},
	publishedDate: {
		type: Number
	},
	availableDate: {
		type: Number
	},
	metadata: {
		type: [Schema.Types.Mixed]
	},
	contents: {
		type: [Schema.Types.Mixed]
	},
	credits: {
		type: [Schema.Types.Mixed]
	},
	parentalRatings: {
		type: [Schema.Types.Mixed]
	},
	images: {
		type: [Schema.Types.Mixed]
	},
	categories: {
		type: [Schema.Types.Mixed]
	},
	id: {
		type: String
	},
	viewingHistory: [{
		type: Schema.Types.ObjectId,
		ref: 'ViewingRecord'
	}]
});

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;
