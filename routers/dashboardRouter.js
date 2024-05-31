const express = require("express");
const router = express.Router();
const upload = require("../upload");
const Blog=require("../models/blogSchema")
const {
  dashboard_GET,
  dashboard_home_GET,
  dashboard_createBlog_GET,
  dashboard_createBlog_POST,
  dashboard_yourBlogs_GET,
  dashboard_searchBlog_POST,
  dashboard_timepass_GET,
  dashboard_likes_POST,
  dashboard_comments_POST,
  dashboard_allBlogs_GET
} = require("../controllers/dashboardRouter");
const {authorization}=require("../middlewares/authorization")

router.get("/", dashboard_GET);

router.get("/home", dashboard_home_GET);

router.get("/createBlog", dashboard_createBlog_GET);

router.post("/createBlog", upload.single("file"), dashboard_createBlog_POST);

router.get("/yourBlogs", dashboard_yourBlogs_GET);

router.post("/searchBlog", dashboard_searchBlog_POST);

router.get("/timepass", dashboard_timepass_GET);

router.post("/likes/:id", dashboard_likes_POST);

router.post("/comments/:id", dashboard_comments_POST);

router.get("/allblogs",authorization("admin"),dashboard_allBlogs_GET)

router.post("/find",async (req,res)=>{
  console.log(req.body.search)
  
  let blogs=await Blog.find({
    title:req.body.search
  })
  if(blogs.length!=0){
    res.render("dashboard",{blogs:blogs})
  }
  else{
    res.send("No results found!")
  }
}
)
module.exports = router;
