const mongoose = require("mongoose");
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
});

module.exports = mongoose.model("Campground", campgroundSchema);
