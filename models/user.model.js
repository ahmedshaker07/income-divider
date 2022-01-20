const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
  },
  spentThisMonth: {
    type: Number,
  },
  spentLastMonth:{
    type: Number
  }
});
const User = mongoose.model('User', userSchema);

module.exports = User;