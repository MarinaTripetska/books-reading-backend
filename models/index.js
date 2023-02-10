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
  validQueryStatusSchema,
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
  validQueryStatusSchema,
};
