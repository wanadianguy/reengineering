const mongoose = require("mongoose");

module.exports = new mongoose.Schema({  
    idUser: String,
    name: String,
    cart: [{
        idDish: String,
        quantity: Number,
    }],
    state: {
        type: Boolean,
        default: false,
    },
    address: {
        type: String,
        default: "",
    }
});