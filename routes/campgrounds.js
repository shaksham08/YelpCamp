const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");

//INDEX - show all campgrounds
router.get("/", (req, res) => {
  //get all campgrounds from db
  Campground.find({}, (err, allcampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {
        campgrounds: allcampgrounds,
        currentUser: req.user,
      });
    }
  });
  //
});

//NEw : show fporm to create campground
//* getting data from the form
//!CREATE - add  new campground to DB
router.post("/", isLoggedIn, (req, res) => {
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username,
  };
  var newCampground = {
    name: name,
    image: image,
    description: description,
    author: author,
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

router.get("/new", isLoggedIn, function (req, res) {
  res.render("campgrounds/new.ejs");
});

router.get("/:id", (req, res) => {
  //find the campground with provided id and show the details

  Campground.findById(req.params.id)
    .populate("comments")
    .exec((err, foundCampgrounds) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(foundCampgrounds);
        res.render("campgrounds/show", { campground: foundCampgrounds });
      }
    });
});

//!middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

module.exports = router;
