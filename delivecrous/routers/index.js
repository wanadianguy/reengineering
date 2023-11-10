const express = require("express");
const router = express.Router();
const DishRouter = require("./dish.router.js");
const UserRouter = require("./user.router");
const AuthRouter = require("./login");
const CartRouter = require("./cart.router");

const API_DISHES = `/dishes`;
const API_USERS = "/users";
const API_AUTH = "/auth";
const API_CART = "/carts";

router.use(API_DISHES, DishRouter);
router.use(API_USERS, UserRouter);
router.use(API_AUTH, AuthRouter);
router.use(API_CART, CartRouter);

module.exports = router;