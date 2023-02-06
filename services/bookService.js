const { Book, User } = require("../models");

const booksList = async () => {
  return await Book.find();
};

const createBook = async (_id, payload) => {
  const { name, author } = payload;

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

const deleteBook = async (userId, bookId) => {
  const res = await Book.findOneAndDelete({
    owner: userId,
    _id: bookId,
  });
  console.log(res);
  if (res === null) {
    throw new Error(`Book with that id doesn't exist`);
  }

  return res;
};

module.exports = {
  booksList,
  createBook,
  deleteBook,
};
