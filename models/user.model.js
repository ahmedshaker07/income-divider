const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  spentThisMonth: Number,
  spentLastMonth: Number,
  availableMonthlyBalance: Number
});

const User = mongoose.model('User', userSchema);

module.exports = User;