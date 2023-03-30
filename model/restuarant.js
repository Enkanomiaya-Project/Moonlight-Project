const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  menu: String,
  
});

const orderSchema = new mongoose.Schema({
    order_id: Number,
    order
});

exports.User = mongoose.model("User", userSchema);
