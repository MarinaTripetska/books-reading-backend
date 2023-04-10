const { trainingService } = require("../../services");

const getTrainingById = async (req, res, next) => {
  const { trainingId } = req.query;
  const { _id: userId } = req.user;

  const training = await trainingService.getTrainingById(userId, trainingId);

  res.status(200).json({
    status: "OK",
    code: 200,
    data: training,
  });
};

module.exports = getTrainingById;
