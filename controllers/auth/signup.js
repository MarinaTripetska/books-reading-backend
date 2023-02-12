const { User } = require("../../models");

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  // if user already exist:
  const user = await User.findOne({ email });

  if (user) {
    throw new ReferenceError("Email in use");
  }

  // create new user:
  const newUser = new User({ name, email });

  // salt the password
  newUser.setPassword(password);

  // save to db:
  await newUser.save();

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        name,
        email,
      },
    },
  });
};

module.exports = signup;
