const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  email: String,
  name: String,
  blogID: String,
  fileType: String,
  likes: Number,
  likedBy: [String], 
  commentInfo: [{
    name: String,
    commentContent: String
  }]
});

module.exports = mongoose.model('Blog', blogSchema);
