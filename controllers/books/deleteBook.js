const { bookService } = require("../../services");

const deleteBook = async (req, res, _) => {
  const { bookId } = req.query;
  const { _id: userId } = req.user;

  const result = await bookService.deleteBook(userId, bookId);

  res.status(200).json({
    status: "Delete",
    code: 200,
    message: `The book ${result.name} by ${result.author} has been removed successfully`,
  });
};

module.exports = deleteBook;
