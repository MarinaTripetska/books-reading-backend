const { bookService } = require("../../services");

const updateStatus = async (req, res, next) => {
  const { _id: userId } = req.user;

  const result = await bookService.updateStatus(userId, req.body);

  res.status(200).json({
    status: "OK",
    code: 200,
    data: result,
  });
};

module.exports = updateStatus;
