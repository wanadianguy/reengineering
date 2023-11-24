import HttpStatus from 'http-status-codes';
import {CartService} from '../services/cart.service.js';
import {CART_CREATED, CART_UPDATED, CART_NOT_FOUND, CART_DELETED, CART_VALIDATED} from '../constants/cart.const.js';
import {INVALID_REQUEST} from "../constants/commun.const.js";
import {StatusError} from "../Errors/statusError.js";

export const CartController = {
    findUserCarts: async (request, response, next) => {
        await CartService.findUserCarts(request.params.userId)
            .then(carts => response.status(HttpStatus.OK).send(carts))
            .catch(() => response.status(HttpStatus.BAD_REQUEST).send({message: INVALID_REQUEST}));
    },

    findUserCartById: async (request, response, next) => {
        await CartService.findUserCartById(request.params.userId, request.params.cartId)
            .then(cart => cart
                ? response.status(HttpStatus.OK).send(cart)
                : response.status(HttpStatus.NOT_FOUND).send({message: CART_NOT_FOUND})
            )
            .catch(() => response.status(HttpStatus.BAD_REQUEST).send({message: INVALID_REQUEST}));
    },

    createUserCart: async (request, response, next) => {
        await CartService.createUserCart(request.params.userId)
            .then(() => response.status(HttpStatus.OK).send({message: CART_CREATED}))
            .catch(() => response.status(HttpStatus.BAD_REQUEST).send({message: INVALID_REQUEST}));
    },

    addDishToCart: async (request, response, next) => {
        await CartService.addDishToCart(request.params.userId, request.params.cartId, request.body)
            .then(() => response.status(HttpStatus.OK).send({message: CART_UPDATED}))
            .catch(error => error instanceof StatusError
                ? response.status(error.requestStatus).send({message: error.message})
                : response.status(HttpStatus.BAD_REQUEST).send({message: INVALID_REQUEST})
            );
    },

    deleteUserCart: async (request, response, next) => {
        await CartService.deleteUserCart(request.params.userId, request.params.cartId)
            .then(() => response.status(HttpStatus.OK).send({message: CART_DELETED}))
            .catch(error => error instanceof StatusError
                ? response.status(error.requestStatus).send({message: error.message})
                : response.status(HttpStatus.BAD_REQUEST).send({message: INVALID_REQUEST})
            );
    },

    confirmCart: async (request, response, next) => {
        await CartService.confirmCart(request.params.userId, request.params.cartId, request.body)
            .then(() => response.status(HttpStatus.OK).send({message: CART_VALIDATED}))
            .catch(error => error instanceof StatusError
                ? response.status(error.requestStatus).send({message: error.message})
                : response.status(HttpStatus.BAD_REQUEST).send({message: INVALID_REQUEST})
            );
    }
};
