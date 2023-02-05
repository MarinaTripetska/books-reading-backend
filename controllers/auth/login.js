const { User } = require("../../models");
const { updateTokens } = require("../../services");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    throw new TypeError("Email or password is wrong");
  }

  const { _id: userId, name } = user;

  tokens = await updateTokens(userId);

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      tokens,
      user: {
        email,
        name,
      },
    },
  });
};

module.exports = login;
