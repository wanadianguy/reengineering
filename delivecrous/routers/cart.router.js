const express = require("express");
const CartRouter = express.Router();
const CartController = require("../controllers/cart.controller.js");
const { validate } = require("express-validation");
const CartValidator = require("../validators/cart.validators.js");
const AuthencationMiddleware = require("../middlewares/authentication.middleware");

const API_USER_PARAM = `/:id`;
const API_CHECKOUT = `/:id/checkout`

CartRouter
    .route("/")
    .get((req, res, next) => AuthencationMiddleware.verifyToken(req, res, next), CartController.findUserCarts)
    .post((req, res, next) => AuthencationMiddleware.verifyToken(req, res, next),  validate(CartValidator.validateCreateUserCart), CartController.createUserCart);

CartRouter
    .route(API_USER_PARAM)
    .get((req, res, next) => AuthencationMiddleware.verifyToken(req, res, next), CartController.findUserCartById)
    .put((req, res, next) => AuthencationMiddleware.verifyToken(req, res, next), CartController.updateUserCart)
    .delete((req, res, next) => AuthencationMiddleware.verifyToken(req, res, next), CartController.deleteUserCart);

CartRouter
    .route(API_CHECKOUT)
    .post((req, res, next) => AuthencationMiddleware.verifyToken(req, res, next), CartController.validateCart)

module.exports = CartRouter;