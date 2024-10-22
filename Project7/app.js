require('dotenv').config()
const express = require("express");
const path = require("path");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const app = express();
const port = process.env.PORT;
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL).then((e) => {
  console.log("MongoDB connected...");
});
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/auth");
const Blog = require("./models/blog");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

//if you want to access data from static assests, you must use express,static
//also if there are two different folders at same level, from which you want to access data, use app.use('public1',express.static(path.resolve("./public")));
//access data from localhost:8000/public1/images/xyz.png instead of localhost:8000/images/xyz.png,and no need of public1 in case of only one folder.

app.get("/", async (req, res) => {
  try {
    const userBlogs = await Blog.find({}).sort({
      createdAt: -1,
    });
    return res.render("home", {
      user: req.user,
      userBlogs: userBlogs,
    });
  } catch (error) {
    return res.render("home", {
      user: req.user,
    });
  }
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);
//we can do npm i nodemon -D, it installs it in devDependencies,

app.listen(port, () => {
  console.log("Server Started...");
});
