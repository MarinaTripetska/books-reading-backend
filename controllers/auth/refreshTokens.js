const jwt = require("jsonwebtoken");
const { updateTokens } = require("../../services");

const { SECRET_KEY } = process.env;

const refreshTokens = async (req, res, next) => {
  const { refreshToken } = req.body;

  const { type, userId } = jwt.verify(refreshToken, SECRET_KEY);

  if (type !== "refresh") {
    throw new Error("Invalid token");
  }

  const tokens = await updateTokens(userId);

  res.status(200).json({
    status: "OK",
    code: 200,
    data: {
      tokens,
    },
  });
};

module.exports = refreshTokens;
