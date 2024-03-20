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
  identity: Joi.alternatives()
    .try(
      Joi.string().email().label("Email"),
      Joi.string()
        .pattern(/^[0-9]{10}$/)
        .label("Mobile Number")
    )
    .required(),
  password: Joi.string().required().label("Password"),
});

module.exports = { registerValidation, loginValidation };
