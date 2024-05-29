const express = require("express");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "rishabh@$@";
const router = express.Router();
const User = require("../models/userSchema");
const Blog = require("../models/blogSchema");
router.get("/signup", (req, res) => {
  res.render("signup");
});
router.post("/signup", async (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  await User.create({
    name: name,
    email: email,
    password: password,
    blogs: {
      title: "",
      content: "",
    },
  });
  res.redirect("/users/login");
});
router.get("/login", (req, res) => {
  res.render("login", {
    login: true,
  });
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await User.findOne({
    email: email,
    password: password,
  });
  if (result != null) {
    const token = jwt.sign(
      {
        email: email,
        name: result.name,
      },
      SECRET_KEY
    );
  
    res.cookie("token", token);
    res.redirect("/dashboard");
  }
  if (result == null) {
    res.render("login", {
      login: false,
    });
  }
});
module.exports = router;
