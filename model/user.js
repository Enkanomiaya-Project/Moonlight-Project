const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String ,
  password: String ,
  role: String
});

exports.User = mongoose.model("User", userSchema);
