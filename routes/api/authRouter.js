const express = require("express");

const { validRegisterSchema, validLoginSchema } = require("../../models");

const { authCtrl } = require("../../controllers");
const { validation } = require("../../middleware");

const router = express.Router();

router.post(
  "/signup",

  validation(validRegisterSchema),

  async (req, res, next) => {
    try {
      await authCtrl.signup(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/login",

  validation(validLoginSchema),

  async (req, res, next) => {
    try {
      await authCtrl.login(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
