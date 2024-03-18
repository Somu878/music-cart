const express = require("express");
const productRouter = express.Router();
const Product = require("../models/productModel");
const authorization = require("../middlewares/verifyToken");
const User = require("../models/userModel");
// productRouter.get("/all-products", async (req, res) => {
//   const data = await Product.find();
//   res.status(200).json({ data });
// });
// productRouter.get("/:name", async (req, res) => {
//   try {
//     const query = req.params.name;
//     const data = await Product.find({ name: { $regex: query, $options: "i" } });
//     res.status(200).json({ data });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Internal Server Error");
//   }
// });
productRouter.get("/view-product/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const product = await Product.find({ name: name });
    res.status(200).json({ product });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

productRouter.get("/filter", async (req, res) => {
  try {
    const query = {};
    if (req.query.productType) {
      query.productType = { $regex: new RegExp(req.query.productType, "i") };
    }
    if (req.query.name) {
      query.name = { $regex: new RegExp(req.query.name, "i") };
    }
    if (req.query.brand) {
      query.brandName = { $regex: new RegExp(req.query.brand, "i") };
    }
    if (req.query.color) {
      query.color = { $regex: new RegExp(req.query.color, "i") };
    }
    if (req.query.priceRange) {
      const [min, max] = req.query.priceRange.split("-").map(Number);
      query.price = { $gte: min, $lte: max };
    }
    let filteredProducts;
    if (req.query.sort == "price-asc") {
      filteredProducts = await Product.find(query).sort({ price: 1 });
    } else if (req.query.sort == "price-dec") {
      filteredProducts = await Product.find(query).sort({ price: -1 });
    } else if (req.query.sort == "alpha-asc") {
      filteredProducts = await Product.find(query).sort({ name: 1 });
    } else if (req.query.sort == "alpha-dec") {
      filteredProducts = await Product.find(query).sort({ name: -1 });
    } else {
      filteredProducts = await Product.find(query);
    }
    res.status(200).json({ filteredProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

productRouter.put(
  "/add-to-cart/:productId",
  authorization,
  async (req, res) => {
    try {
      const productid = req.params.productId;
      const userid = req.userId;
      const user = await User.findById(userid);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const product = await Product.findById(productid);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      const productExists = user.cart.findIndex(
        (item) => String(item.productId) === String(product._id)
      );
      if (productExists !== -1) {
        user.cart[productExists].quantity++;
      } else {
        user.cart.push({
          productId: product._id,
          name: product.name,
          color: product.color,
          price: product.price,
          productType: product.productType,
          availability: product.availability,
          quantity: 1,
        });
      }
      await user.save();
      res.status(200).json({ message: "Product added to cart successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server error");
    }
  }
);
productRouter.patch(
  "/update-cart/:productId/:quantity",
  authorization,
  async (req, res) => {
    try {
      const { productId, quantity } = req.params;

      const userId = req.userId;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      const productIndex = user.cart.findIndex(
        (item) => String(item.productId) === String(productId)
      );
      if (productIndex === -1) {
        return res.status(404).json({ error: "Product not found in cart" });
      }
      user.cart[productIndex].quantity = quantity;

      await user.save();
      res.status(200).json({ message: "Cart updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server error" });
    }
  }
);

module.exports = productRouter;
