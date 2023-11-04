const FieldStaff = require("../models/fieldStaff");
const asyncHandler = require("express-async-handler");

module.exports.addFieldStaff = asyncHandler(async (req, res) => {
  const { name, username, password, wardNo, category } = req.body;
  const fieldStaff = await FieldStaff.create({
    name,
    username,
    password,
    category,
    wardNo,
  });
  if (fieldStaff) {
    res.status(200).send({ message: "Data added Successfully" });
  } else {
    res.status(400).send({ message: "Invalid Data" });
  }
});

module.exports.fetchFieldStaff = asyncHandler(async (req, res) => {
  const fieldStaff = await FieldStaff.findOne({
    wardNo: req.body.wardNo,
    category: req.body.category,
  });
  if (fieldStaff) {
    res.status(200).send({ message: fieldStaff.name });
  } else {
    res.status(404).send({ message: "Field Staff not yet assigned" });
  }
});
