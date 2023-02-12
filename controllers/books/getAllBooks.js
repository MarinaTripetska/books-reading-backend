const { bookService } = require("../../services");

const getAllBooks = async (req, res, next) => {
  const { _id: userId } = req.user;
  const books = await bookService.booksList(userId);

  res.status(200).json({
    status: "OK",
    code: 200,
    data: {
      booksQuantity: books.length,
      books,
    },
  });
};

module.exports = getAllBooks;
