const mongoose = require("mongoose");

module.exports = mongoose.model("Cart", require("../schemas/cart.schema"));