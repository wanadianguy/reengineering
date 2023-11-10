const db = require("../models/cart.js");

const CartRepository = {
    findAll: () => {
        return db.find();
    },

    findUserCarts: (userId) => {
        return db.find({ idUser: userId });
    },

    findUserCartById: (id) => {
        return db.findById(id);
    },

    createUserCart: (cart) => {
        return new db(cart).save();
    },

    updateUserCart: (id, cart) => {
        return db.findByIdAndUpdate(id, cart);
    },

    deleteDishFromCart: (idCart, idDish) => {
        return db.updateMany({ _id:  idCart}, { "$pull": { "cart": { "idDish": idDish }}});
    },

    deleteUserCart: (id) => {
        return db.findByIdAndDelete(id);
    },
};

module.exports = CartRepository;