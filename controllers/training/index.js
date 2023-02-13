const getAllTrainings = require("./getAllTrainings");
const createTraining = require("./createTraining");
const deleteTraining = require("./deleteTraining");
const getActiveTrainings = require("./getActiveTrainings");
const updateStatistic = require("./updateStatistic");
const getTrainingById = require("./getTrainingById");

module.exports = {
  createTraining,
  getAllTrainings,
  deleteTraining,
  getActiveTrainings,
  updateStatistic,
  getTrainingById,
};
