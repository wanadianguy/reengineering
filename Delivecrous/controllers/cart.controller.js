const CartService = require("../services/cart.service");

const CartController = {
    findUserCarts: async (req, res, next) => {
        const userId = req.user._id;
        const carts = await CartService.findUserCarts(userId);
        res.status(200).send(carts);
    },

    findUserCartById: async (req, res, next) => {
        const userId = req.user._id;
        const cartId = req.params.id;

        const cart = await CartService.findUserCartById(cartId, userId);
        res.status(200).send(cart);
    },

    createUserCart: async (req, res, next) => {
        const userId = req.user._id;
        const cart = req.body;

        cart.idUser = userId;
        await CartService.createUserCart(cart);
        res.status(200).send({ message: "cart created successfully" });
    },

    updateUserCart: async (req, res, next) => {
        const userId = req.user._id;
        const cartId = req.params.id;
        const cartInfo = req.body;

        cartInfo.idUser = userId;
        try {
            await CartService.updateUserCart(cartId, cartInfo, userId);
            res.status(200).send({ message: "cart updated successfully"});
        } catch (error) {
            res.status(404).send({ message: `cart with id - ${cartId} not found`});
        }
    },

    deleteUserCart: async (req, res, next) => {
        const userId = req.user._id;
        const cartId = req.params.id;

        try {
            await CartService.deleteUserCart(cartId, userId);
            res.status(200).send({ message: "cart deleted successfully"});
        } catch (error) {
            res.status(404).send({ messgae: `cart with id - ${cartId} not found`});
        }
    },

    validateCart: async (req, res, next) => {
        const userId = req.user._id;
        const cartId = req.params.id;
        const userInfo = req.body;

        try {
            await CartService.validateCart(cartId, userId, userInfo);
            res.status(200).send({ message: "cart validated successfully"});
        } catch (error) {
            res.status(404).send({ messgae: `cart with id - ${cartId} not found`});
        }
    }
};

module.exports = CartController;