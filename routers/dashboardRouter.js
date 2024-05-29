const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const Blog = require("../models/blogSchema");
const upload = require("../upload");
const path = require('path');
const fs = require('fs');

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

router.post("/createBlog", upload.single('file'), async (req, res) => {
  const { title, content } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  try {
    // Generate the unique suffix for the blogID
    const uniqueSuffix = req.user.name + '-' + Math.round(Math.random() * 1E9);

    // Create the blog post in the database
    const newBlog = await Blog.create({
      title: title,
      content: content,
      email: req.user.email,
      name: req.user.name,
      blogID: uniqueSuffix,
      fileType:path.extname(file.originalname)
    });

    // Rename the uploaded file to match the blogID
    const uploadsDir = path.join(__dirname, '..', 'uploads'); // Ensure the path points to the correct 'uploads' directory
    const newFilename = uniqueSuffix + path.extname(file.originalname);
    const newFilePath = path.join(uploadsDir, newFilename);

    // Move the file to the new filename
    fs.renameSync(file.path, newFilePath);

    res.redirect("/dashboard");
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
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
