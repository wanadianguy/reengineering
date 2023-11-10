const jwt = require("jsonwebtoken");
const {checkToken} = require("../services/authentication.service");

const AuthenticationMiddleware = {

  verifyToken: async (req, res, next) => {
    const usertoken = req.headers.authorization;

    if (!usertoken) {
      return res.status(401).send({error: "A token is required for authentication"});
    }
    try {
      const token = usertoken.replace("Bearer ", "");
      req.user = await checkToken(token);
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).send("Token expired");
      }

      if (err instanceof jwt.JsonWebTokenError) {
        return res.status(401).send("Invalid token");
      }
      console.log(err);
      return res.status(500).send();
    }

    return next();
  }
}

module.exports = AuthenticationMiddleware;
