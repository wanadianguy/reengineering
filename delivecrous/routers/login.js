const express = require("express");
const LoginRouter = express.Router();
const LoginController = require("../controllers/login.controller.js");

LoginRouter.route("/").post((req, res, next) => {
  LoginController.login(req, res, next);
});

module.exports = LoginRouter;

