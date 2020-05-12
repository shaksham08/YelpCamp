const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
var middleware = require("../middleware");
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
router.post("/", middleware.isLoggedIn, (req, res) => {
  var name = req.body.name;
  var price = req.body.price;
  var image = req.body.image;
  var description = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username,
  };
  var newCampground = {
    name: name,
    price: price,
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

router.get("/new", middleware.isLoggedIn, function (req, res) {
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

//* Edit campground ROute
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
  //!is user loged in

  Campground.findById(req.params.id, (err, foundCampground) => {
    res.render("campgrounds/edit", {
      campground: foundCampground,
    });
  });
});
//* Update campground route
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
  //!find and update the correct campground and redirect
  //we can do this also or dorectly we can create the object from form itself
  // var data = {
  //   name: req.body.name,
  //   image: req.body.image,
  //   description: req.body.description,
  // };
  Campground.findByIdAndUpdate(
    req.params.id,
    req.body.campground,
    (err, updatedCampground) => {
      if (err) {
        res.redirect("/campgrounds");
      }
      res.redirect("/campgrounds/" + req.params.id);
    }
  );
});
//*destroy campground route
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      console.log("DELETED");
    }
    res.redirect("/campgrounds");
  });
});




module.exports = router;
