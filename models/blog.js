const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogsSchema = new Schema({
  author: { type: String, required: true },
  content: { type: String, required: true }
});

module.exports = mongoose.model('blogs', BlogsSchema);
