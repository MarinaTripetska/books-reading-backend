const { isPastDate } = require("../helpers");
const { Training, Book } = require("../models");

const getAllTrainings = async (userId) => {
  return await Training.find({ owner: userId })
    .populate("owner", "name email")
    .populate("books.book");
};

const getActiveTrainings = async (userId) => {
  const timeNow = new Date().getTime();
  const allTr = await getAllTrainings(userId);
  return allTr.filter((tr) => {
    const finishTime = new Date(tr.finish).getTime();
    return finishTime - timeNow > 0;
  });
};

const createTraining = async (ownerId, payload) => {
  if (isPastDate(new Date(payload.start))) {
    throw new Error(
      "You can't start your training since the date in the past!"
    );
  }

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

const deleteTraining = async (userId, trainingId) => {
  const res = await Training.findOneAndDelete({
    owner: userId,
    _id: trainingId,
  });

  if (res === null) {
    throw new Error(`Training with that id doesn't exist`);
  }

  return res;
};

module.exports = {
  createTraining,
  getAllTrainings,
  deleteTraining,
  getActiveTrainings,
};
