const getAllProducts = require("./getAllBooks");
const createBook = require("./createBook");
const deleteBook = require("./deleteBook");
const getBookById = require("./getBookById");
const updateStatus = require("./updateStatus");

module.exports = {
  getAllProducts,
  getBookById,
  createBook,
  deleteBook,
  updateStatus,
};
