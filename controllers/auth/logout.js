const { User } = require("../../models");

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { tokens: null });

  res.sendStatus(204);
};

module.exports = logout;
