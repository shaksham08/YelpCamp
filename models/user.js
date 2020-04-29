const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

//add some method to our user
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
