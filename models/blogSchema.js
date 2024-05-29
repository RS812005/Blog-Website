const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title:{
    type:String,
    require:true
  },
  content:{
    type:String,
    require:true
  },
  email:{
    type:String
  },
  name:{
    type:String
  }
});

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
