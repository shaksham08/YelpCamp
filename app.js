const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = 8000;
var seedDB = require("./seeds");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

const commentRoutes = require("./routes/comments");
const campgroundRoutes = require("./routes/campgrounds");
const indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//seedDB();

//passport configuration
app.use(
  require("express-session")({
    secret: "i am the best",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
//call on every route
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(port, () => {
  console.log(`Server is runnning ${port}`);
});
