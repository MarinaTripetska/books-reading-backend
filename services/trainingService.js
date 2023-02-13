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

  const totalPages = books.reduce((acc, cur) => (acc += cur.pages), 0);

  const newTraining = await Training.create({
    owner: ownerId,
    totalPages,
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

  //check if the training exist and get data about
  const training = await Training.findOne({
    owner: userId,
    _id: trainingId,
  });

  if (training === null) {
    throw new Error(`Training with that id doesn't exist`);
  }

  //check if payload.date is in start-finish diapason
  const timeStampFinish = new Date(training.finish);
  const timeStampStart = new Date(training.start);
  const timeStampStatistic = new Date(date);

  if (
    timeStampFinish < timeStampStatistic ||
    timeStampStatistic < timeStampStart
  ) {
    throw new Error(`Your statistic should be in start-finish diapason`);
  }

  //check if training has been finished
  if (isPastDate(timeStampFinish)) {
    throw new Error(`This training is finished`);
  }

  //check if reade pages are not more then total pages
  if (training.readPages + pages <= training.totalPages) {
    training.readPages += pages;
  } else {
    throw new Error("You provide more pages than you plan to read");
  }

  //update DB
  const res = await Training.findOneAndUpdate(
    {
      owner: userId,
      _id: trainingId,
    },

    {
      readPages: training.readPages,
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
