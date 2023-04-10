const { trainingService } = require("../../services");

const deleteTraining = async (req, res, _) => {
  const { trainingId } = req.query;
  const { _id: userId } = req.user;

  await trainingService.deleteTraining(userId, trainingId);

  res.status(200).json({
    status: "Delete",
    code: 200,
    message: `The training with id ${trainingId} has been removed successfully`,
  });
};

module.exports = deleteTraining;
