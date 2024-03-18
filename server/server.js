const express = require("express");
require("dotenv").config();
const app = express();
const db = require("./db/config");
const authRouter = require("./routes/authRouter");
const productRouter = require("./routes/productRouter");

const PORT = process.env.PORT || 9000;
app.use("/user", authRouter);
app.use("/products", productRouter);
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
