const Joi = require("@hapi/joi");

const registerValidation = Joi.object({
  name: Joi.string().required().label("Name"),
  email: Joi.string().email().required().label("Email"),
  mobileNumber: Joi.string()
    .pattern(new RegExp("^[0-9]{10}$"))
    .required()
    .label("Mobile Number"),
  password: Joi.string().required().label("Password"),
  cart: Joi.array().optional(),
});
const loginValidation = Joi.object({
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().required().label("Password"),
});

module.exports = { registerValidation, loginValidation };
