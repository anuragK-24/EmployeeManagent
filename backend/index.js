const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv").config();
const cors = require("cors");
const app = express();
const uri = process.env.MONGO_URL;
//controllers
const authController = require("./controllers/authController.js");
const empolyeeController = require("./controllers/empolyeeController.js");

mongoose.set("strictQuery", false);

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(err));

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/images", express.static("public/images"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/auth", authController);
app.use("/emp", empolyeeController);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
