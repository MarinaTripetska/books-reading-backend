const { bookService } = require("../../services");

const getBookById = async (req, res, next) => {
  const { bookId } = req.query;
  const { _id: userId } = req.user;

  const book = await bookService.getBookById(userId, bookId);

  res.status(200).json({
    status: "OK",
    code: 200,
    data: book,
  });
};

module.exports = getBookById;
