const { bookService } = require("../../services");

const updateResume = async (req, res, next) => {
  const { _id: userId } = req.user;

  const result = await bookService.updateResume(userId, req.body);

  res.status(200).json({
    status: "OK",
    code: 200,
    data: result,
  });
};

module.exports = updateResume;
