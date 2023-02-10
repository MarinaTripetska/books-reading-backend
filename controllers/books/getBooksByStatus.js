const { bookService } = require("../../services");

const getBooksByStatus = async (req, res, next) => {
  const { status } = req.query;
  const { _id: userId } = req.user;

  const res = await bookService.getBooksByStatus(userId, status);

  res.status(200).json({
    status: "OK",
    code: 200,
    data: res,
  });
};

module.exports = getBooksByStatus;
