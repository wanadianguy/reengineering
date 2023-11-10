const db = {};

db.dishes = require("./dish.js");
db.carts = require("./cart.js");
db.users = require("./user.js");

module.exports = db;