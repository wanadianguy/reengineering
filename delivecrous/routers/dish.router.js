const express = require("express");
const DishRouter = express.Router();
const DishController = require("../controllers/dish.controller.js");
const { validate } = require("express-validation");
const DishValidator = require("../validators/dish.validators.js");
const AuthencationMiddleware = require("../middlewares/authentication.middleware");

const API_DISH_PARAM = `/:id`;
const API_DISH_QUERY = `/search`;

DishRouter
    .route("/")
    .get(DishController.findAll)
    .post(validate(DishValidator.validateCreate), DishController.create);

DishRouter
    .route(API_DISH_QUERY)
    .get(DishController.findByKeyWord);  

DishRouter
    .route(API_DISH_PARAM)
    .get(DishController.findById)
    .put(validate(DishValidator.validateUpdate), DishController.update)
    .delete(DishController.delete);

module.exports = DishRouter;