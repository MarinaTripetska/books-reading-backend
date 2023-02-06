const getAllProducts = require("./getAllBooks");
const createBook = require("./createBook");
const deleteBook = require("./deleteBook");
const getBookById = require("./getBookById");

module.exports = {
  getAllProducts,
  getBookById,
  createBook,
  deleteBook,
};
