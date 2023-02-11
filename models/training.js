const { Schema, model } = require("mongoose");
const Joi = require("joi");

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
        bookId: {
          type: Schema.Types.ObjectId,
          ref: "product",
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
  bookId: Joi.string().required(),
});

const validCreateTrainingSchema = Joi.object({
  start: Joi.date().default(Date.now()),
  finish: Joi.date().required(),
  books: Joi.array().items(book).required(),
});

const Training = model("training", trainingSchema);

module.exports = {
  Training,
  validCreateTrainingSchema,
};
