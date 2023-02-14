const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("./env");

const generateAccessToken = (userId) => {
  const payload = {
    userId,
    type: "access",
  };

  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1m" });
};

const generateRefreshToken = (userId) => {
  const payload = {
    userId,
    type: "refresh",
  };

  return jwt.sign(payload, SECRET_KEY, { expiresIn: "3m" });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
