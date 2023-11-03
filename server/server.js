//env
require("dotenv").config();

//express
const express = require("express");
const app = express();

//bodyParser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cors = require("cors");

const PORT = 5000;

const db = require("./db/user");

app.use(cors());

const apiRoutes = require("./routes/api");
app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
