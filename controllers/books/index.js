const getAllBooks = require("./getAllBooks");
const createBook = require("./createBook");
const deleteBook = require("./deleteBook");
const getBookById = require("./getBookById");
const updateStatus = require("./updateStatus");
const updateResume = require("./updateResume");

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  deleteBook,
  updateStatus,
  updateResume,
};
