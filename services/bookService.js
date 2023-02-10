const { Book, User } = require("../models");

const booksList = async () => {
  return await Book.find().populate("owner", "name email");
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

const getBookById = async (userId, bookId) => {
  const res = await Book.findOne({
    owner: userId,
    _id: bookId,
  }).populate("owner", "name email");

  if (res === null) {
    throw new Error(`Book with that id doesn't exist`);
  }

  return res;
};

const deleteBook = async (userId, bookId) => {
  const res = await Book.findOneAndDelete({
    owner: userId,
    _id: bookId,
  });

  if (res === null) {
    throw new Error(`Book with that id doesn't exist`);
  }

  return res;
};

const updateStatus = async (userId, payload) => {
  const { bookId, status } = payload;
  const res = await Book.findOneAndUpdate(
    {
      owner: userId,
      _id: bookId,
    },

    { status },

    {
      new: true,
    }
  ).populate("owner", "name email");

  if (res === null) {
    throw new Error(`Book with that id doesn't exist`);
  }

  return res;
};

const updateResume = async (userId, payload) => {
  const { bookId, resume, rating } = payload;
  const res = await Book.findOneAndUpdate(
    {
      owner: userId,
      _id: bookId,
    },

    { resume, rating },

    {
      new: true,
    }
  ).populate("owner", "name email");

  if (res === null) {
    throw new Error(`Book with that id doesn't exist`);
  }

  return res;
};

module.exports = {
  booksList,
  createBook,
  deleteBook,
  getBookById,
  updateStatus,
  updateResume,
};
