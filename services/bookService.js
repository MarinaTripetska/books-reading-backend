const { Book } = require("../models");

const booksList = async () => {
  return await Book.find();
};

const createBook = async (_id, payload) => {
  const { name, author, year, pages } = payload;

  const bookExist = await Book.findOne({ owner: _id })
    .where("name")
    .equals(name)
    .where("author")
    .equals(author);

  if (bookExist) {
    throw new Error("Book already exists");
  }

  return await Book.create({ owner: _id, ...payload });
};

module.exports = {
  booksList,
  createBook,
};
