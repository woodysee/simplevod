const dotenv = require("dotenv");
const session = require("express-session");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Configure .env path
dotenv.config();
dotenv.load({path: '.env'});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(__dirname + "/../client/build"));

// console.log("Connecting to NoSQL database...");
mongoose.Promise = global.Promise;
// To handle promise rejections. See http://mongoosejs.com/docs/promises.html	
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on('error', (err) => {
	console.error(err);
	console.log('...Unable to connect to Simple VOD database. Exiting...');
	process.exit();
});

const routes = require('./routes');
// console.log("Allowing Cross-Origin Resource Sharing for only the client domain...");
app.use(cors({
	origin: process.env.CLIENT_DOMAIN,
	credentials: true
}));
app.use('/api', routes);

app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname, '/../client/build/index.html'), function(err) {
		if (err) {
			res.status(500).send(err)
		}
	})
})

app.listen(process.env.SERVER_PORT, () => {
	console.info(
	"server/app.js: express.js server app is now running locally on port: " +
		process.env.SERVER_PORT
	);
});
