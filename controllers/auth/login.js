const { User } = require("../../models");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    throw new TypeError("Email or password is wrong");
  }

  const { name } = user;

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      user: {
        email,
        name,
      },
    },
  });
};

module.exports = login;
