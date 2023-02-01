const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    //tokens
    userLib: {
      books: { type: Array, default: null }, //arr of books id
    },
  },
  { versionKey: false, timestamps: true }
);

//salt hash password:
userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(6));
};

//parse salted password:
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

//validation Schema for Registration:
const validRegisterSchema = Joi.object({
  name: Joi.string().min(3).max(200).required().messages({
    "string.base": `"name" should be a type of 'text'`,
    "string.empty": `"name" cannot be an empty field`,
    "string.min": `"name" should have a minimum length of {#limit}`,
    "string.max": `"name" should have a maximum length of {#limit}`,
    "any.required": `"name" is a required field`,
  }),
  email: Joi.string()
    .min(5)
    .max(254)
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua"] },
    })
    .required()
    .messages({
      "string.base": `"email" should be a type of 'text'`,
      "string.empty": `"email" cannot be an empty field`,
      "string.min": `"email" should have a minimum length of {#limit}`,
      "string.max": `"email" should have a maximum length of {#limit}`,
      "any.required": `"email" is a required field`,
    }),
  password: Joi.string()
    .min(8)
    .max(100)
    .regex(/(?=.*[0-9])(?=.*[a-z])[0-9a-zA-Z]{8,}/)
    .required()
    .messages({
      "string.base": `"password" should be a type of 'text'`,
      "string.empty": `"password" cannot be an empty field`,
      "string.min": `"password" should have a minimum length of {#limit}`,
      "string.max": `"password" should have a maximum length of {#limit}`,
      "any.required": `"password" is a required field`,
    }),
});

//validation Schema for Login:
const validLoginSchema = Joi.object({
  email: Joi.string()
    .min(5)
    .max(254)
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua"] },
    })
    .required()
    .messages({
      "string.base": `"email" should be a type of 'text'`,
      "string.empty": `"email" cannot be an empty field`,
      "string.min": `"email" should have a minimum length of {#limit}`,
      "string.max": `"email" should have a maximum length of {#limit}`,
      "any.required": `"email" is a required field`,
    }),
  password: Joi.string().required().messages({
    "string.base": `"password" should be a type of 'text'`,
    "string.empty": `"password" cannot be an empty field`,
    "any.required": `"password" is a required field`,
  }),
});

const User = model("user", userSchema);

module.exports = {
  User,
  validRegisterSchema,
  validLoginSchema,
};
