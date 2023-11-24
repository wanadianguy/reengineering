import express from 'express';
import {CartController} from '../controllers/cart.controller.js';
import {AuthenticationController} from "../controllers/authentication.controller.js";

const CartRouter = express.Router();

CartRouter
    .route("/:userId")
    .get((request, response, next) => AuthenticationController.verifyToken(request, response, next), CartController.findUserCarts)
    .post((request, response, next) => AuthenticationController.verifyToken(request, response, next), CartController.createUserCart);

CartRouter
    .route('/:userId/:cartId')
    .get((request, response, next) => AuthenticationController.verifyToken(request, response, next), CartController.findUserCartById)
    .put((request, response, next) => AuthenticationController.verifyToken(request, response, next), CartController.addDishToCart)
    .delete((request, response, next) => AuthenticationController.verifyToken(request, response, next), CartController.deleteUserCart);

CartRouter
    .route('/:userId/:cartId/confirm')
    .put((request, response, next) => AuthenticationController.verifyToken(request, response, next), CartController.confirmCart)

export default CartRouter;
