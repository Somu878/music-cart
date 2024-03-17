const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const {
  registerValidation,
  loginValidation,
} = require("../validations/userValidation");
const authourization = require("../middlewares/verifyToken");
authRouter.use(express.json());
authRouter.post("/register", async (req, res) => {
  try {
    const userData = await registerValidation.validateAsync(req.body);
    const userExists = await User.findOne({ email: userData.email });
    if (userExists) {
      return res.status(202).send({
        message:
          "Email already registered, Please login or try different credentials",
      });
    }
    const hashedPassword = await bcrypt.hashSync(userData.password, 10);
    const newuser = new User({
      ...userData,
      password: hashedPassword,
    });
    const savedUser = await newuser.save();
    const token = await jwt.sign(
      { userId: savedUser._id },
      process.env.JWT_SECRET
    );
    res.status(200).json({
      token: token,
    });
  } catch (error) {
    if (error.details) {
      return res
        .status(400)
        .json({ error: "Validation failed", details: error.details });
    } else {
      console.log(error);
      return res.status(500).send("Internal server error");
    }
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = await loginValidation.validateAsync(req.body);
    const userExists = await User.findOne({ email: email });
    if (!userExists) {
      return res.status(203).json({ message: "Email not found" });
    }
    const passwordMatch = await bcrypt.compare(password, userExists.password);
    if (!passwordMatch) {
      return res.status(202).send({ status: "invalid" });
    }
    const token = await jwt.sign(
      { userId: userExists._id },
      process.env.JWT_SECRET
    );
    return res.status(200).json({ token: token, message: "sucess" });
  } catch (error) {
    if (error.details) {
      console.log(error.details);
      res.status(401).json({ error: error.details });
    } else {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
});

authRouter.get("/data", authourization, async (req, res) => {
  const data = await Product.find();
  res.status(200).json({
    data: data,
    username: req.userName,
    // cart: req.cart,
  });
});

module.exports = authRouter;
