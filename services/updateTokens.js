const { User } = require("../models");
const { generateAccessToken, generateRefreshToken } = require("../helpers");

const updateTokens = async (userId) => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);

  const tokens = { accessToken, refreshToken };

  await User.findByIdAndUpdate(userId, { tokens });

  return tokens;
};

module.exports = updateTokens;
