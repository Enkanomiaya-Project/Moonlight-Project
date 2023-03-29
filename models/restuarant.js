const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number
});

const orderListSchema = new mongoose.Schema({
    name: String,
    items:[itemSchema.name],
    price: [itemSchema.price],
    date: Date,
    time: time
})

exports.OrderList = mongoose.model("List", orderListSchema);
exports.Item = mongoose.model("item", itemSchema);