import database from '../models/cart.js';

export const CartRepository = {
    findAll: () => database.find(),

    findUserCarts: (userId) => database.find({ idUser: userId }),

    findUserCartById: (userId, cartId) => database.findOne({_id: cartId, idUser: userId}),

    createUserCart: (cart) => new database(cart).save(),

    updateCart: (cartId, cart) => database.findByIdAndUpdate(cartId, cart),

    deleteDishFromCarts: (cartId, dishId) => database.updateMany({ _id:  cartId}, { '$pull': { 'cart': { 'idDish': dishId }}}),

    deleteCart: (id) => database.findByIdAndDelete(id),

    deleteUserCarts: (userId) => database.deleteMany({idUser: userId}),
};
