const {
  User,
  validRegisterSchema,
  validLoginSchema,
  validRefreshTokenSchema,
} = require("./user");

const {
  Book,
  validCreateBookSchema,
  validUpdateBookSchema,
  validUpdateStatusSchema,
  validUpdateResumeSchema,
} = require("./book");

module.exports = {
  User,
  Book,
  validRegisterSchema,
  validLoginSchema,
  validRefreshTokenSchema,
  validCreateBookSchema,
  validUpdateBookSchema,
  validUpdateStatusSchema,
  validUpdateResumeSchema,
};
