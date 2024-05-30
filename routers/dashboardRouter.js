const express = require("express");
const router = express.Router();
const upload = require("../upload");
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
} = require("../controllers/dashboardRouter");

router.get("/", dashboard_GET);

router.get("/home", dashboard_home_GET);

router.get("/createBlog", dashboard_createBlog_GET);

router.post("/createBlog", upload.single("file"), dashboard_createBlog_POST);

router.get("/yourBlogs", dashboard_yourBlogs_GET);

router.post("/searchBlog", dashboard_searchBlog_POST);

router.get("/timepass", dashboard_timepass_GET);

router.post("/likes/:id", dashboard_likes_POST);
router.post("/comments/:id", dashboard_comments_POST);
module.exports = router;
