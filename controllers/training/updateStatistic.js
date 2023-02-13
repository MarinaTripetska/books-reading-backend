const { trainingService } = require("../../services");

const updateStatistic = async (req, res, next) => {
  const { _id: userId } = req.user;

  const result = await trainingService.updateStatistic(userId, req.body);

  res.status(200).json({
    status: "OK",
    code: 200,
    data: result,
  });
};

module.exports = updateStatistic;
