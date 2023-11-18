const FieldStaff = require("../models/fieldStaff");
const asyncHandler = require("express-async-handler");

module.exports.addFieldStaff = asyncHandler(async (req, res) => {
  const { name, username, password, wardNo, category } = req.body;
  if (!name || !username || !password || !wardNo || !category) {
    res.status(400).send({ message: "Please Add All Fields" });
  } else {
    const fieldStaffExists = await FieldStaff.findOne({ username });
    if (fieldStaffExists) {
      res.status(400).send({ message: "Field Staff Already Exist!" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
    }
  }
  const fieldStaff = await FieldStaff.create({
    name,
    username,
    password: hashedPassword,
    category,
    wardNo,
  });
  if (fieldStaff) {
    res.status(200).send({ message: "Data added Successfully" });
  } else {
    res.status(400).send({ message: "Invalid Data" });
  }
});

module.exports.removeFieldStaff = asyncHandler(async (req, res) => {
  const { username } = req.body;
  const Status = await FieldStaff.deleteOne({ username: username });
  if (Status.deletedCount === 1) {
    res.status(200).send({ message: "Field Staff Removed Successfully" });
  } else {
    res
      .status(400)
      .send({ message: "Invalid Username, Field Staff Doesnt Exists!" });
  }
});

module.exports.fetchFieldStaff = asyncHandler(async (req, res) => {
  const fieldStaff = await FieldStaff.findOne({
    wardNo: req.body.wardNo,
    category: req.body.category,
  });
  if (fieldStaff) {
    res.status(200).send({
      name: fieldStaff.name,
      assignedStaffUsername: fieldStaff.username,
    });
  } else {
    res.status(404).send({ message: "Field Staff not yet assigned" });
  }
});
