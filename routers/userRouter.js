const express = require("express");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "rishabh@$@";
const router = express.Router();
const User = require("../models/userSchema");
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
    if(email=="rishabh0381@gmail.com"){
       token = jwt.sign(
        {
          email: email,
          name: result.name,
          role:"admin"
        },
        SECRET_KEY
      );
    }
    else{
       token = jwt.sign(
        {
          email: email,
          name: result.name,
          role:"user"
        },
        SECRET_KEY
      );
    }
  
    res.cookie("token", token);
    res.redirect("/dashboard");
  }
  if (result == null) {
    res.render("login", {
      login: false,
    });
  }
});
router.get("/signout",(req,res)=>{
  res.clearCookie("token");
  res.redirect("/users/login");

})
module.exports = router;
