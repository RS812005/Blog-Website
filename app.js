require("dotenv").config();
const express = require("express");
const cookie_parser=require("cookie-parser");
const path = require("path");
const { connectToMongoDB } = require("./connection");
const {tokenAuth}=require("./middlewares/auth")
const userRouter=require("./routers/userRouter");
const dashboardRouter=require("./routers/dashboardRouter");

const PORT = process.env.PORT || 8000;
const app = express();

connectToMongoDB(process.env.MONGO_URL).then(() => {
  console.log("MongoDb connected!");
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie_parser());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/users",userRouter);
app.use("/dashboard",tokenAuth,dashboardRouter)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
