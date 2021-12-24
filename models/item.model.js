const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  describtion: {
    type: String,
  },
  value: {
    type: Number,
  }
});
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;