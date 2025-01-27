const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: Number,
  name: String,
  address: String,
  age: Number,
  dateOfBirth: Date,
});

module.exports = mongoose.model('User', userSchema);
