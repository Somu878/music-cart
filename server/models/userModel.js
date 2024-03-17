// const { required } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [
    {
      product: {
        name: String,
        color: String,
        price: Number,
        productType: String,
        availability: String,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
});
const User = mongoose.model("Users", userSchema);

module.exports = User;
