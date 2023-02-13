const express = require("express");

const { validCreateTrainingSchema } = require("../../models");
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

//update statistics (push new achieve)

module.exports = router;
