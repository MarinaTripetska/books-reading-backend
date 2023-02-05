const current = async (req, res, next) => {
  const { tokens, email, name } = req.user;

  res.status(200).json({
    status: "Success",
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

module.exports = current;
