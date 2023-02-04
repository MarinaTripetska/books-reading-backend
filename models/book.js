const { Schema, model } = require("mongoose");

const booksSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  author: {
    type: String,
    required: [true, "Author is required"],
  },
  year: {
    type: Number,
    required: [true, "Year is required"],
  },
  pages: {
    type: Number,
    required: [true, "Number of pages is required"],
  },
  status: {
    type: String,
    enum: {
      values: ["pending", "active", "done"],
      message: "{VALUE} is not supported",
    },
    default: "pending",
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  resume: {
    type: "String",
    default: null,
  },
  rating: {
    type: Number,
    min: [1, "Must be at least 1, got {VALUE}"],
    max: [5, "Must be maximum 5, got {VALUE}"],
    default: null,
  },
});

const Book = model("book", booksSchema);

module.exports = Book;
