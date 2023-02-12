const express = require("express");

const { validCreateTrainingSchema } = require("../../models");
const { validation, authorization, ctrlWrapper } = require("../../middleware");
const { trainingCtrl } = require("../../controllers");

const router = express.Router();
//get all trainings
//get trainings with date in future (active training)
//create training
router.post(
  "/create",

  ctrlWrapper(authorization),

  validation(validCreateTrainingSchema),

  ctrlWrapper(trainingCtrl.createTraining)
);
//update statistics (push new achieve)
//delete training
router.get("/");

module.exports = router;
