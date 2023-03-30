const mongoose = require("mongoose");

const foodDeliverySchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  customer: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    }
  },
  items: [
    {
      name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  deliveryTime: {
    type: Date,
    required: true
  },
  deliveryPerson: {
    name: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['QUEUEING', 'COOKING', 'DELIVERING', 'SUCCESSED'],
    default: 'QUEUEING'
  }
}, { timestamps: true });

exports.FoodDelivery = mongoose.model("FoodDelivery", foodDeliverySchema);
