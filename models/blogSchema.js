const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  email: String,
  name: String,
  blogID: String,
  fileType: String,
  likes: Number,
  likedBy: [String] // Store user IDs who have liked the post
});

module.exports = mongoose.model('Blog', blogSchema);
