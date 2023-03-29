const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    address: String,
})

exports.Customer = mongoose.model("Customer", customerSchema);
