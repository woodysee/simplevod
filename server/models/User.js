const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true},
  password: String
}, { timestamps: true });

const User = Mongoose.model('User', userSchema);
module.exports = User;
