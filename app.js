const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = 8000;

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
});

const Campground = mongoose.model("campground", campgroundSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", (req, res) => {
  //get all campgrounds from db
  Campground.find({}, (err, allcampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { campgrounds: allcampgrounds });
    }
  });
  //
});

//NEw : show fporm to create campground
//* getting data from the form
app.post("/campgrounds", (req, res) => {
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCampground = {
    name: name,
    image: image,
    description: description,
  };

  // create a new campground and save to the databse
  Campground.create(newCampground, (err, newAddedCampground) => {
    if (err) {
      console.log(err);
    } else {
      console.log(newAddedCampground);
      res.redirect("/campgrounds");
    }
  });
});

app.get("/campgrounds/new", function (req, res) {
  res.render("new.ejs");
});

app.get("/campgrounds/:id", (req, res) => {
  //find the campground with provided id and show the details

  Campground.findById(req.params.id, (err, foundCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("show", { campground: foundCampgrounds });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is runnning ${port}`);
});
