const Blog = require("../models/blogSchema");
const path = require("path");
const fs = require("fs");

let searchBlog = {};

async function dashboard_GET(req, res) {
  userEmail = req.user.email;

  let blogs = await Blog.find({});
  res.render("dashboard", { blogs: blogs });
}
function dashboard_home_GET(req, res) {
  res.redirect("/dashboard");
}
function dashboard_createBlog_GET(req, res) {
  res.render("createBlog");
}
async function dashboard_createBlog_POST(req, res) {
  const { title, content } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  try {
    // Generate the unique suffix for the blogID
    const uniqueSuffix = req.user.name + "-" + Math.round(Math.random() * 1e9);

    // Create the blog post in the database
    const newBlog = await Blog.create({
      title: title,
      content: content,
      email: req.user.email,
      name: req.user.name,
      blogID: uniqueSuffix,
      fileType: path.extname(file.originalname),
      likes: 0,
      likedBy: [], // Initialize the likedBy array
      commentInfo: [
        {
          name: "",
          commentContent: "",
        },
      ],
    });

    // Rename the uploaded file to match the blogID
    const uploadsDir = path.join(__dirname, "..", "uploads"); // Ensure the path points to the correct 'uploads' directory
    const newFilename = uniqueSuffix + path.extname(file.originalname);
    const newFilePath = path.join(uploadsDir, newFilename);

    // Move the file to the new filename
    fs.renameSync(file.path, newFilePath);

    res.redirect("/dashboard");
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function dashboard_yourBlogs_GET(req, res) {
  let blogs = await Blog.find({ email: req.user.email });
  res.render("yourBlogs", { blogs: blogs });
}
async function dashboard_searchBlog_POST(req, res) {
  let title = req.body.title;
  let content = req.body.content;
  let name = req.body.name;
  searchBlog = await Blog.findOne({ title: title, name: name });
  res.redirect("/dashboard/timepass");
}
function dashboard_timepass_GET(req, res) {
  res.render("searchBlog", { blog: searchBlog });
}
async function dashboard_likes_POST(req, res) {
  let userEmail = req.user.email;

  try {
    // Find the blog post
    searchBlog = await Blog.findOne({ blogID: req.params.id });

    // Check if the user has already liked the searchBlog post
    if (searchBlog.likedBy.includes(userEmail)) {
      return res.redirect("/dashboard/timepass"); // User has already liked this post
    }

    // Increment the likes count and add the user's email to the likedBy array
    searchBlog.likes += 1;
    searchBlog.likedBy.push(userEmail);
    await searchBlog.save();
    console.log(searchBlog);
    res.redirect("/dashboard/timepass");
  } catch (error) {
    console.error("Error updating likes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function dashboard_comments_POST(req, res) {
  searchBlog = await Blog.findOne({ blogID: req.params.id });
  searchBlog.commentInfo.push({
    name: req.user.name,
    commentContent: req.body.commentContent,
  });
  await searchBlog.save();
  res.redirect("/dashboard/timepass");
}

module.exports = {
  dashboard_GET,
  dashboard_home_GET,
  dashboard_createBlog_GET,
  dashboard_createBlog_POST,
  dashboard_yourBlogs_GET,
  dashboard_searchBlog_POST,
  dashboard_timepass_GET,
  dashboard_likes_POST,
  dashboard_comments_POST,
};
