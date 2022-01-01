const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  describtion: {
    type: String,
  },
  value: {
    type: Number,
  },
  date:{
    type: Date
  }
});
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;