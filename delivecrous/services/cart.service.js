import {CartRepository} from '../repositories/cart.repository.js';
import {DishRepository} from '../repositories/dish.repository.js';
import Cart from "../models/cart.js";
import {StatusError} from "../Errors/statusError.js";
import HttpStatus from "http-status-codes";
import {
    CART_ADDRESS_NOT_SPECIFIED,
    CART_ALREADY_CONFIRMED,
    CART_NOT_FOUND,
    EMPTY_CART
} from "../constants/cart.const.js";

export const CartService = {
    findUserCarts: (userId) => CartRepository.findUserCarts(userId),

    findUserCartById: (userId, cartId) => CartRepository.findUserCartById(userId, cartId),

    createUserCart: (userId) => {
        const cart = new Cart();
        cart.idUser = userId;
        return CartRepository.createUserCart(cart);
    },

    addDishToCart: async (userId, cartId, dishToAdd) => {
        const cart = await CartRepository.findUserCartById(userId, cartId);
        if(!cart) throw new StatusError(HttpStatus.NOT_FOUND, CART_NOT_FOUND);
        if(cart.state === true) throw new StatusError(HttpStatus.BAD_REQUEST, CART_ALREADY_CONFIRMED);
        for(const dish of cart.cart){
            if(dish.idDish === dishToAdd.dishId){
                dish.quantity += dishToAdd.quantity;
                return CartRepository.updateCart(cartId, cart);
            }
        }
        cart.cart.push(dishToAdd);
        return CartRepository.updateCart(cartId, cart);
    },

    deleteUserCart: async (userId, cartId) => {
        const cart = await CartRepository.findUserCartById(userId, cartId);
        if(!cart) throw new StatusError(HttpStatus.NOT_FOUND, CART_NOT_FOUND);
        return CartRepository.deleteCart(cartId);
    },

    deleteDishFromCarts: async (dishId) => {
        const carts = await CartRepository.findAll();

        for(const cart of carts) {
            await CartRepository.deleteDishFromCarts(cart._id, dishId);
        }
    },

    confirmCart: async (userId, cartId, userAddress) => {
        const cart = await CartRepository.findUserCartById(userId, cartId);
        if(!cart) throw new StatusError(HttpStatus.NOT_FOUND, CART_NOT_FOUND);
        if(cart.cart.length <= 0) throw new StatusError(HttpStatus.BAD_REQUEST, EMPTY_CART);
        if(cart.state === true) throw new StatusError(HttpStatus.BAD_REQUEST, CART_ALREADY_CONFIRMED);
        if(userAddress.address == null || userAddress.address.length <= 0) throw new StatusError(HttpStatus.BAD_REQUEST, CART_ADDRESS_NOT_SPECIFIED);
        cart.address = userAddress.address;
        cart.state = true;
        return CartRepository.updateCart(cartId, cart);
    }
};
