const { bookService } = require("../../services");

const updateBook = async (req, res, next) => {
  const { _id: userId } = req.user;

  const result = await bookService.updateBook(userId, req.body);

  res.status(200).json({
    status: "OK",
    code: 200,
    data: result,
  });
};

module.exports = updateBook;
