const { Training, Book } = require("../models");

const createTraining = async (ownerId, payload) => {
  //TODO: checking correct start date - it can't be date in the past
  const booksIds = payload.books.map((itm) => itm.book);

  const books = await Book.find()
    .where("_id")
    .in(booksIds)
    .where("owner")
    .equals(ownerId);

  if (books.length !== payload.books.length || !books) {
    throw new Error("This user hasn't book's with such ids");
  }

  const newTraining = await Training.create({
    owner: ownerId,
    ...payload,
  });

  return await Training.findById(newTraining._id)
    .populate("owner", "name email")
    .populate("books.book");
};

module.exports = {
  createTraining,
};
