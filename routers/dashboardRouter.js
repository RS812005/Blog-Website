const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const Blog = require("../models/blogSchema");
const upload = require("../upload");

let searchBlog = {};

router.get("/", async (req, res) => {
  let userEmail = req.user.email;
  let currentUser = await User.findOne({ email: userEmail });
  let blogs = await Blog.find({});
  res.render("dashboard", { blogs: blogs });
});

router.get("/home", (req, res) => {
  res.send("Home");
});

router.get("/createBlog", (req, res) => {
  res.render("createBlog");
});

router.post("/createBlog",upload.single('file'), async (req, res) => {

  let title = req.body.title;
  let content = req.body.content;
  let name = req.user.name;
  result=await Blog.create({
    title: title,
    content: content,
    email: req.user.email,
    name: name
  });
  const file = req.file;        
  file.originalname=req.user.email+"-"+result._id
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }
  res.redirect("/dashboard");
});

router.get("/yourBlogs", async (req, res) => {
  let blogs = await Blog.find({ email: req.user.email });
  res.render("yourBlogs", { blogs: blogs });
});

router.post("/searchBlog", async (req, res) => {
  let title = req.body.title;
  let content = req.body.content;
  let name = req.body.name;
  searchBlog = await Blog.findOne({ title: title, name: name });
  res.redirect("/dashboard/timepass");
});

router.get("/timepass", (req, res) => {
  res.render("searchBlog", { blog: searchBlog });
});

module.exports = router;
