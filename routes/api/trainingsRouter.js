const express = require("express");

const {
  validCreateTrainingSchema,
  validUpdateStatisticSchema,
} = require("../../models");
const { validation, authorization, ctrlWrapper } = require("../../middleware");
const { trainingCtrl } = require("../../controllers");

const router = express.Router();
//get all trainings
router.get(
  "/",

  ctrlWrapper(authorization),

  ctrlWrapper(trainingCtrl.getAllTrainings)
);

//create training
router.post(
  "/",

  ctrlWrapper(authorization),

  validation(validCreateTrainingSchema),

  ctrlWrapper(trainingCtrl.createTraining)
);

//delete training
router.delete(
  "/",

  ctrlWrapper(authorization),

  ctrlWrapper(trainingCtrl.deleteTraining)
);

//get trainings with date in future (active training)
router.get(
  "/active-trainings",

  ctrlWrapper(authorization),

  ctrlWrapper(trainingCtrl.getActiveTrainings)
);

//get training by id
router.get(
  "/training",

  ctrlWrapper(authorization),

  ctrlWrapper(trainingCtrl.getTrainingById)
);

//update statistics (push new achieve)
router.patch(
  "/statistic",

  ctrlWrapper(authorization),

  validation(validUpdateStatisticSchema),

  ctrlWrapper(trainingCtrl.updateStatistic)
);

module.exports = router;
