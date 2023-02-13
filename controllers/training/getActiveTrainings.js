const { trainingService } = require("../../services");

const getActiveTrainings = async (req, res, next) => {
  const { _id: userId } = req.user;

  const trainings = await trainingService.getActiveTrainings(userId);

  res.status(200).json({
    status: "OK",
    code: 200,
    data: {
      trainingQuantity: trainings.length,
      trainings,
    },
  });
};

module.exports = getActiveTrainings;
