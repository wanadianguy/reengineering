const {login} = require("../services/authentication.service");

const LoginController = {
    async login(req, res, next) {
      try {
        const userName = req.body.username;
        const password = req.body.password;
  
        const token = await login(userName, password);
  
        if (token) {
          res.status(200).send({token});
        } else {
          res.status(400).send("Invalid credentials");
        }
      } catch (error) {
        console.log(error);
        res.status(500).send();
      }
    }
  }
  
  module.exports = LoginController;
  