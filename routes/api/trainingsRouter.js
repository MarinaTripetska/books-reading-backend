const express = require("express");

const {} = require("../../models");

const { authCtrl } = require("../../controllers");
const { validation, authorization } = require("../../middleware");

const router = express.Router();
//get all trainings
//get trainings with date in future (active training)
//create training
//update statistics (push new achieve)
//delete training
router.get("/");

module.exports = router;
