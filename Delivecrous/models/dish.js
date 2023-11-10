const mongoose = require("mongoose");

module.exports = mongoose.model("Dish", require("../schemas/dish.schema"));