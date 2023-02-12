const { User } = require("../models");
const jwt = require("jsonwebtoken");
const { envHelper } = require("../helpers");

const authorization = async (req, _, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    throw new Error("Not authorized");
  }

  const { userId } = jwt.verify(token, envHelper.SECRET_KEY);

  const user = await User.findById(userId);

  if (!user || !user.tokens) {
    throw new Error("Not authorized");
  }

  req.user = user;

  next();
};

module.exports = authorization;
