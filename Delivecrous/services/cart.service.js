const CartRepository = require("../repositories/cart.repository");
const DishRepository = require("../repositories/dish.repository");

const CartService = {
    findUserCarts: async (userId) => {
        return await CartRepository.findUserCarts(userId);
    },

    findUserCartById: async(id, userId) => {
        const cart = await CartRepository.findUserCartById(id);
        
        if(!(cart.idUser == userId)) {
            throw new Error("Id user not found");
        }
        
         return cart;
    },

    createUserCart: async (cart) => {
        await CartRepository.createUserCart(cart);
    },

    updateUserCart: async (cartId, cartInfo, userId) => {
        const userCart = await CartRepository.findUserCartById(cartId);

        if(!userCart) {
            throw new Error("Cart not found");
        }

        if(!(cart.idUser == userId)) {
            throw new Error("Id user not found");
        }
        

        if(userCart.state == true) {
            throw new Error("Cart already validated");
        }

        if(cartInfo.name != null) {
            userCart.name = cartInfo.name;
        }

        if(cartInfo.cart != null) {
            let dishesToRemove = [];

            for(const dishCart of cartInfo.cart) {
                let found = false;

                if(await DishRepository.findById(dishCart.idDish)) {

                    for(const dishUser of userCart.cart) {
                        if(dishUser.idDish == dishCart.idDish) {
                            dishUser.quantity += dishCart.quantity;
                            
                            if(dishUser.quantity <= 0) {
                                dishesToRemove.push(dishUser);
                            }

                            found = true;
                        }
                    }

                    if(!found) {
                        userCart.cart.push({ idDish: dishCart.idDish, quantity: dishCart.quantity});
                    }
                }
                else {
                    throw new Error("Dish not found");
                }
            }

            if(dishesToRemove.length > 0) {
                for(const dish of dishesToRemove) {
                    userCart.cart.splice(userCart.cart.indexOf(dish), 1);
                }
            }
        }

        return await CartRepository.updateUserCart(cartId, userCart);
    },

    deleteUserCart: async (cartId, userId) => {
        const cart = await CartRepository.findUserCartById(cartId);
        
        if(!cart) {
            throw Error("cart not found");
        }

        if(!(cart.idUser == userId)) {
            throw new Error("Id user not found");
        }

        return await CartRepository.deleteUserCart(cartId);
    },

    deleteUserCarts: async (userId) => {
        const carts = await CartRepository.findUserCarts(userId);
        if(!carts) {
            throw Error("cart not found");
        }
        return carts.length > 0 ? await CartRepository.deleteMany({ idUser: userId }) : null;
    },

    deleteDish: async (idDish) => {
        const carts = await CartRepository.findAll();

        for(const cartUser of carts) {
            await CartRepository.deleteDishFromCart(cartUser._id, idDish);
        }
    },

    validateCart: async (cartId, userId, userInfo) => {
        const cartUser = await CartRepository.findUserCartById(cartId);

        if(cartUser.idUser != userId) {
            throw new Error("Id user not found");
        }

        if(cartUser.cart.length <= 0) {
            throw new Error("Empty cart");
        }

        if(cartUser.state == true) {
            throw new Error("Cart already validated");
        }

        if(userInfo.address == null || userInfo.address.length <= 0) {
            throw new Error("Empty address");
        }

        cartUser.address = userInfo.address;
        cartUser.state = true;

        return await CartRepository.updateUserCart(cartId, cartUser);
    }
};

module.exports = CartService;