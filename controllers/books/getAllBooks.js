const { bookService } = require("../../services");

const getAllProducts = async (req, res, next) => {
  const books = await bookService.booksList();

  res.status(200).json({
    status: "OK",
    code: 200,
    data: {
      booksQuantity: books.length,
      books,
    },
  });
};

module.exports = getAllProducts;
