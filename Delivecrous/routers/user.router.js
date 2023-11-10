const express = require("express");
const UserRouter = express.Router();
const UserController = require("../controllers/user.controller.js");
const { validate } = require("express-validation");
const UserValidator = require("../validators/user.validators.js");

const API_USER_PARAM = `/:id`;

UserRouter
    .route("/")
    .get(UserController.findAll)
    .post(validate(UserValidator.validateCreate), UserController.create);

UserRouter
    .route(API_USER_PARAM)
    .get(UserController.findById)
    .put(UserController.update)
    .delete(UserController.delete);

module.exports = UserRouter;