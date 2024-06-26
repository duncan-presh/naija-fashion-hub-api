const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sub: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  gender: {
    type:String,
    required: false
  }

});

module.exports = mongoose.model('Category', CategorySchema);
