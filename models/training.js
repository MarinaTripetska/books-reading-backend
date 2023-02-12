const { Schema, model } = require("mongoose");
const JoiBase = require("joi");
const JoiDate = require("@joi/date");

const Joi = JoiBase.extend(JoiDate);

const trainingSchema = Schema(
  {
    start: {
      type: Date,
      default: Date.now(),
    },

    finish: {
      type: Date,
      required: [true, "Finish date is required"],
    },

    books: [
      {
        book: {
          type: Schema.Types.ObjectId,
          ref: "book",
          required: [true, "Book Id is required"],
        },
      },
    ],

    statistics: [
      {
        date: {
          type: Date,
          default: Date.now(),
        },
        pages: {
          type: Number,
          required: [true, "Field pages is required"],
        },
      },
    ],

    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const book = Joi.object().keys({
  book: Joi.string().required(),
});

const validCreateTrainingSchema = Joi.object({
  start: Joi.date()
    .format(["YYYY/MM/DD HH:mm:ss.SSSZ", "YYYY-MM-DD HH:mm:ss.SSSZ"])
    .utc()
    .default(Date.now()),
  finish: Joi.date()
    .format(["YYYY/MM/DD HH:mm:ss.SSSZ", "YYYY-MM-DD HH:mm:ss.SSSZ"])
    .utc()
    .required(),
  books: Joi.array().items(book).required(),
});

const Training = model("training", trainingSchema);

module.exports = {
  Training,
  validCreateTrainingSchema,
};
