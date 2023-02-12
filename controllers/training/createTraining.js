const { trainingService } = require("../../services");

const createTraining = async (req, res, _) => {
  const { _id } = req.user;

  const result = await trainingService.createTraining(_id, req.body);

  res.status(201).json({
    status: "Create",
    code: 201,
    data: result,
  });
};

module.exports = createTraining;
