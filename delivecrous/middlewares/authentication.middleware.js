const jwt = require("jsonwebtoken");
const {checkToken} = require("../services/authentication.service");

const AuthenticationMiddleware = {

  verifyToken: async (req, res, next) => {
    const userToken = req.headers.authorization;

    if (!userToken) {
      return res.status(401).send({error: "A token is required for authentication"});
    }
    try {
      const token = userToken.replace("Bearer ", "");
      req.user = await checkToken(token);
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError || err instanceof jwt.JsonWebTokenError) {
        return res.status(401).send(err instanceof jwt.TokenExpiredError ? "Token expired" : "Invalid token");
      }

      return res.status(500).send();
    }

    return next();
  }
}

module.exports = AuthenticationMiddleware;
