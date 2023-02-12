const { trainingService } = require("../../services");

const getAllTrainings = async (req, res, next) => {
  const { _id: userId } = req.user;

  const trainings = await trainingService.getAllTrainings(userId);

  res.status(200).json({
    status: "OK",
    code: 200,
    data: {
      trainingQuantity: trainings.length,
      trainings,
    },
  });
};

module.exports = getAllTrainings;
