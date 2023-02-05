const express = require("express");

const {
  validRegisterSchema,
  validLoginSchema,
  validRefreshTokenSchema,
} = require("../../models");

const { authCtrl } = require("../../controllers");
const { validation, authorization } = require("../../middleware");

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

router.get(
  "/current",

  async (req, res, next) => {
    try {
      await authorization(req, res, next);
    } catch (error) {
      next(error);
    }
  },

  async (req, res, next) => {
    try {
      await authCtrl.current(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/logout",

  async (req, res, next) => {
    try {
      await authorization(req, res, next);
    } catch (error) {
      next(error);
    }
  },

  async (req, res, next) => {
    try {
      await authCtrl.logout(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/refresh-tokens",

  validation(validRefreshTokenSchema),

  async (req, res, next) => {
    try {
      await authCtrl.refreshTokens(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
