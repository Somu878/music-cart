const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const db = require("./db/config");
const origin = process.env.CLIENT_ORIGIN || "http://localhost:5173";
const PORT = process.env.PORT || 9000;
const authRouter = require("./routes/authRouter");
const productRouter = require("./routes/productRouter");
app.use(express.json());
app.use(
  cors({
    origin: origin,
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Methods", "GET, POST,PATCH,DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use("/user", authRouter);
app.use("/products", productRouter);
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
