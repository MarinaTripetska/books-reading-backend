const express = require("express");

const {
  validRegisterSchema,
  validLoginSchema,
  validRefreshTokenSchema,
} = require("../../models");

const { authCtrl } = require("../../controllers");
const { validation, authorization, ctrlWrapper } = require("../../middleware");

const router = express.Router();

router.post(
  "/signup",

  validation(validRegisterSchema),

  ctrlWrapper(authCtrl.signup)
);

router.post(
  "/login",

  validation(validLoginSchema),

  ctrlWrapper(authCtrl.login)
);

router.get(
  "/current",

  ctrlWrapper(authorization),

  ctrlWrapper(authCtrl.current)
);

router.get(
  "/logout",

  ctrlWrapper(authorization),

  ctrlWrapper(authCtrl.logout)
);

router.post(
  "/refresh-tokens",

  validation(validRefreshTokenSchema),

  ctrlWrapper(authCtrl.refreshTokens)
);

module.exports = router;
