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

const { Training, validCreateTrainingSchema } = require("./training");

module.exports = {
  User,
  Book,
  Training,
  validCreateTrainingSchema,
  validRegisterSchema,
  validLoginSchema,
  validRefreshTokenSchema,
  validCreateBookSchema,
  validUpdateBookSchema,
  validUpdateStatusSchema,
  validUpdateResumeSchema,
  validQueryStatusSchema,
};
