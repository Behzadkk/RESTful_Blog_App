let express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  app = express();

let PORT = process.env.PORT || 3000;

// APP CONFIG
mongoose.connect("mongodb://localhost:27017/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// MONGOOSE/MODEL CONFIG
const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now }
});

const Blog = mongoose.model("Blog", blogSchema);
// Blog.create({
//   title: "Test Blog",
//   image: "https://unsplash.com/photos/s7qZayMy6Go",
//   body: "HELLO THIS IS A BLOG POST"
// });

// RESTFUL ROUTES
app.get("/", function(req, res) {
  res.redirect("/blogs");
});
// INDEX ROUTE
app.get("/blogs", function(req, res) {
  Blog.find({}, function(err, blogs) {
    if (err) {
      console.log("ERROR!");
    } else {
      res.render("index", { blogs: blogs });
    }
  });
});

// NEW ROUTE
app.get("/blogs/new", function(req, res) {
  res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res) {
  Blog.create(req.body.blog, function(err, newBlog) {
    if (err) {
      res.render("new");
    } else {
      res.redirect("/blogs");
    }
  });
});

app.listen(PORT, function() {
  console.log("SERVER IS RUNNING AT PORT " + PORT);
});
