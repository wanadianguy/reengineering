const HttpStatus = require('http-status-codes');
const CartService = require("../services/cart.service");

const CartController = {
    findUserCarts: async (request, response, next) => {
        response.status(HttpStatus.OK).send(await CartService.findUserCarts(request.user._id));
    },

    findUserCartById: async (request, response, next) => {
        response.status(HttpStatus.OK).send(await CartService.findUserCartById(request.user._id, request.params.id));
    },

    createUserCart: async (request, response, next) => {
        const cart = request.body;

        cart.idUser = request.user._id;
        await CartService.createUserCart(request.body);
        response.status(HttpStatus.OK).send({ message: "cart created successfully" });
    },

    updateUserCart: async (request, response, next) => {
        const userId = request.user._id;
        const cartId = request.params.id;
        const cartInfo = request.body;

        cartInfo.idUser = userId;
        try {
            await CartService.updateUserCart(cartId, cartInfo, userId);
            response.status(HttpStatus.OK).send({ message: "cart updated successfully"});
        } catch (error) {
            response.status(HttpStatus.NOT_FOUND).send({ message: `cart with id - ${cartId} not found`});
        }
    },

    deleteUserCart: async (request, response, next) => {
        const userId = request.user._id;
        const cartId = request.params.id;

        try {
            await CartService.deleteUserCart(cartId, userId);
            response.status(HttpStatus.OK).send({ message: "cart deleted successfully"});
        } catch (error) {
            response.status(HttpStatus.NOT_FOUND).send({ message: `cart with id - ${cartId} not found`});
        }
    },

    validateCart: async (request, response, next) => {
        const userId = request.user._id;
        const cartId = request.params.id;
        const userInfo = request.body;

        try {
            await CartService.validateCart(cartId, userId, userInfo);
            response.status(HttpStatus.OK).send({ message: "cart validated successfully"});
        } catch (error) {
            response.status(HttpStatus.NOT_FOUND).send({ message: `cart with id - ${cartId} not found`});
        }
    }
};

module.exports = CartController;