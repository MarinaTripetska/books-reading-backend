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

// get all books:
router.get(
  "/",

  ctrlWrapper(authorization),

  ctrlWrapper(booksCtrl.getAllProducts)
);

//get one by id:
router.get(
  "/book",

  ctrlWrapper(authorization),

  ctrlWrapper(booksCtrl.getBookById)
);

//create:
router.post(
  "/create",

  ctrlWrapper(authorization),

  validation(validCreateBookSchema),

  ctrlWrapper(booksCtrl.createBook)
);

//delete:
router.delete(
  "/delete",

  ctrlWrapper(authorization),

  ctrlWrapper(booksCtrl.deleteBook)
);

// get one by search, get
// update one -  all info, patch or put
// update status for one, patch
// update resume for one, patch
module.exports = router;
