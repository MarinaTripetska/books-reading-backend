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
  const { start, finish, books: booksData } = payload;

  if (isPastDate(new Date(start)) || isPastDate(new Date(finish))) {
    throw new Error(
      "You can't start or finish your training since the date in the past!"
    );
  }

  const booksIds = booksData.map((itm) => itm.book);

  const books = await Book.find()
    .where("_id")
    .in(booksIds)
    .where("owner")
    .equals(ownerId);

  if (books.length !== booksData.length || !books) {
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

const updateStatistic = async (userId, payload) => {
  const { trainingId, date, pages } = payload;

  // if (isPastDate(new Date(date))) {
  //   throw new Error("This date is in the past!");
  // }

  const training = await Training.findOne({
    owner: userId,
    _id: trainingId,
  });

  if (training === null) {
    throw new Error(`Training with that id doesn't exist`);
  }
  //todo: check if date is not before start date, total pages
  if (isPastDate(new Date(training.finish))) {
    throw new Error(`This training is finished`);
  }

  const res = await Training.findOneAndUpdate(
    {
      owner: userId,
      _id: trainingId,
    },

    {
      $push: {
        statistics: { date, pages },
      },
    },

    {
      new: true,
    }
  )
    .populate("owner", "name email")
    .populate("books.book");

  return res;
};

module.exports = {
  createTraining,
  getAllTrainings,
  deleteTraining,
  getActiveTrainings,
  updateStatistic,
};
