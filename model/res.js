const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  menu: String,
  price: String,
});

const orderListSchema = new mongoose.Schema({
    items:[orderSchema]
})

const foodDeliverySchema = new mongoose.Schema({
  orderNumber:String,
    customer: {
    name: String,
    email:String,
    address:String,
  },
  items: orderListSchema,
  totalAmount: Number,
  date: Date,
  status: {
    type: String,
    enum: ['QUEUEING', 'COOKING', 'DELIVERING', 'SUCCESSED'],
    default: 'QUEUEING'
  }
}, { timestamps: true });

exports.List = mongoose.model("List", orderListSchema);
exports.Item = mongoose.model("item", orderSchema);
exports.FoodDelivery = mongoose.model("FoodDelivery", foodDeliverySchema);
