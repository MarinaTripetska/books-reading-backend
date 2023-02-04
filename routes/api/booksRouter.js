const express = require("express");
// const {
//   joiDietaryDateSchema,
//   joiDietaryUpdateDateSchema,
//   joiGetDateSchema,
// } = require("../../models");
// const { ctrlWrapper, auth, validation } = require("../../middlewares");
// const { dietaryCtrl } = require("../../controllers");

const router = express.Router();

// router.get(
//   "/",
//   ctrlWrapper(auth),
//   validation(joiGetDateSchema),
//   ctrlWrapper(dietaryCtrl.getDailyDiet)
// );

// router.post(
//   "/",
//   ctrlWrapper(auth),
//   validation(joiDietaryDateSchema),
//   ctrlWrapper(dietaryCtrl.createDailyDiet)
// );

// router.patch(
//   "/",
//   ctrlWrapper(auth),
//   validation(joiDietaryUpdateDateSchema),
//   ctrlWrapper(dietaryCtrl.updateDailyDiet)
// );

// router.delete("/", ctrlWrapper(auth), ctrlWrapper(dietaryCtrl.deleteDailyDiet));

module.exports = router;
