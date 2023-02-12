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
  "/create",

  ctrlWrapper(authorization),

  validation(validCreateTrainingSchema),

  ctrlWrapper(trainingCtrl.createTraining)
);

//delete training
router.delete(
  "/delete",

  ctrlWrapper(authorization),

  ctrlWrapper(trainingCtrl.deleteTraining)
);
//get trainings with date in future (active training)
//update statistics (push new achieve)

router.get("/");

module.exports = router;
