const jwt = require("jsonwebtoken");
const SECRET = "secret";
const userService = require("./user.service");

const AuthenticationService = {
    login: async (userName, password) => {
    const user = await userService.checkPassword(userName, password);
    if (user) {
      return jwt.sign(
        {
          _id: user._id,
          username: user.username,
        },
        SECRET,
        { expiresIn: "1 hours" }
      );
    }

    return null;
  },

  checkToken: async (token) => {
    return jwt.verify(token, SECRET);
  }
}

module.exports = AuthenticationService;
