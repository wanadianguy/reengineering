const HttpStatus = require('http-status-codes');
const {login} = require("../services/authentication.service");

const LoginController = {
    async login(request, response, next) {
      try {
        const token = await login(request.body.username, request.body.password);
  
        if (token) {
          response.status(HttpStatus.OK).send({token});
        } else {
          response.status(HttpStatus.BAD_REQUEST).send("Invalid credentials");
        }
      } catch (error) {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
      }
    }
  }
  
  module.exports = LoginController;
  