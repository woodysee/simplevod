const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  id: uuidv4(),
  name: { type: String, unique: true },
  email: { type: String, unique: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
