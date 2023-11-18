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

const PORT = process.env.PORT || 5000;
const db = require("./src/db/user");

app.use(
  cors({
    origin: ["https://janhit-vadodara.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

const apiRoutes = require("./src/routes/api");
app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
