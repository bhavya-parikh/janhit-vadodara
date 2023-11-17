const Admin = require("../models/admin");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { createSecretToken } = require("../util/SecretToken");

const dashboard = asyncHandler(async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role;

  const User = await Admin.findOne({ username: req.body.username });

  if (role !== "fieldStaff" && role !== "deptHead" && role !== "commissioner") {
    res.status(404).send({ message: "Role is invalid!" });
  }
  if (!User) {
    res.status(404).send({ message: "User Not Found" });
  }
  var validate = 0;
  if (req.body.password == User.password) {
    validate = 1;
  } else {
    validate = 0;
  }
  if (!validate) {
    res.status(403).send({ message: "Wrong Pass" });
  }
  const token = createSecretToken(User);
  res.cookie("token", token, {
    withCredentials: true,
    httpOnly: false,
  });
  res.status(201).json({ message: "User logged in successfully", token, User });
  next();
});

const fetchData = asyncHandler(async (req, res) => {
  const role = req.body.username;
  try {
    const complaints = await Complaint.find({ role }); // Use the "role" parameter to filter complaints
    res.json(complaints);
  } catch (errors) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching complaints." });
  }
});

module.exports = {
  dashboard,
  fetchData,
};
