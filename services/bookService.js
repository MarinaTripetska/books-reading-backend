const { Book } = require("../models");

const booksList = async () => {
  return await Book.find();
};

module.exports = {
  booksList,
};
