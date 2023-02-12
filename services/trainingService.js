const { Training, Book } = require("../models");

const getAllTrainings = async (userId) => {
  return await Training.find({ owner: userId })
    .populate("owner", "name email")
    .populate("books.book");
};

const getActiveTrainings = async (userId) => {
  const timeNow = new Date().getTime();
  const allTr = await getAllTrainings(userId);
  // [
  //                 {
  //                 "_id": "63e8372f6e8742f21bab0072",
  //                 "start": "2023-02-11T22:13:24.216Z",
  //                 "finish": "2023-02-16T12:30:30.002Z",
  //                 "books": [
  //                     {
  //                         "book": {
  //                             "_id": "63e835fde4556457fb5cf90e",
  //                             "name": "Rest API",
  //                             "author": "Sebastian LoL",
  //                             "year": null,
  //                             "pages": 12,
  //                             "status": "pending",
  //                             "owner": "63e7d58db18df5a3bb44157b",
  //                             "resume": null,
  //                             "rating": null,
  //                             "__v": 0
  //                         },
  //                         "_id": "63e8372f6e8742f21bab0073"
  //                     },
  //      ]
  return allTr.filter((tr) => {
    const finishTime = new Date(tr.finish).getTime();
    return finishTime - timeNow > 0;
  });
};

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
