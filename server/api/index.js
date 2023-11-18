//env
require("dotenv").config();

//express
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
//bodyParser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));
const cors = require("cors");

const PORT = 5000;
const db = require("../src/db/user");

app.use(cors());
app.use(cookieParser());

const apiRoutes = require("../src/routes/api");
app.use("/api", apiRoutes);
app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
