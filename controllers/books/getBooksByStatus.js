const { bookService } = require("../../services");

const getBooksByStatus = async (req, res, next) => {
  const { status } = req.query;
  const { _id: userId } = req.user;

  const resp = await bookService.getBooksByStatus(userId, status);

  res.status(200).json({
    status: "OK",
    code: 200,
    data: resp,
  });
};

module.exports = getBooksByStatus;
