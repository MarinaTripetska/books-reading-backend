const express = require("express");
const {
  validCreateBookSchema,
  validUpdateBookSchema,
  validUpdateStatusSchema,
  validUpdateResumeSchema,
} = require("../../models");
const { authorization, validation, ctrlWrapper } = require("../../middleware");
const { booksCtrl } = require("../../controllers");

const router = express.Router();

// get all books, get
router.get(
  "/",
  ctrlWrapper(authorization),

  ctrlWrapper(booksCtrl.getAllProducts)
);

// get one by search, get
// update one -  all info, patch or put
// update status for one, patch
// update resume for one, patch
// create, post
// delete, delete

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
