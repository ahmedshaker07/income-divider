const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
  },
  value: {
    type: Number,
  },
  amount: {
    type: Number,
  }
});
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;