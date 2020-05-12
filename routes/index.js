const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
var middleware = require("../middleware");
router.get("/", (req, res) => {
  res.render("landing");
});

//!AUTH ROUTE

//*Show register form
router.get("/register", function (req, res) {
  res.render("register");
});
//sign up
router.post("/register", function (req, res) {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      req.flash("error", err.message);
      return res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, () => {
        req.flash("success", "Welcome to YelpCamp " + user.username);
        res.redirect("/campgrounds");
      });
    }
  });
});

//* show login form
router.get("/login", (req, res) => {
  res.render("login", { message: req.flash("error") });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
  }),
  (req, res) => { }
);

//logout route
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Logged you out!");
  res.redirect("/campgrounds");
});


module.exports = router;
