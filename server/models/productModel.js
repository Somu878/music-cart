const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: [
    {
      url: {
        type: String,
        required: true,
      },
    },
  ],
  description: {
    type: String,
    required: true,
  },
  productType: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },

  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  reviews: {
    type: Number,
    required: true,
  },
  brandName: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Products", productSchema);

module.exports = Product;
