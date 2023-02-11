const express = require("express");

const {} = require("../../models");

const { authCtrl } = require("../../controllers");
const { validation, authorization } = require("../../middleware");

const router = express.Router();

router.get("/");

module.exports = router;
