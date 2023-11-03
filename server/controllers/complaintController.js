const Complaint = require("../models/complaint");
const asyncHandler = require("express-async-handler");

module.exports.complaint = asyncHandler(async (req, res) => {
  const {
    complaintType,
    firstname,
    lastname,
    mobileNo,
    address,
    issueCategory,
    issueSubcategory,
    complaintDescription,
  } = req.body;
  const imageUrl = req.file.path;
  if (
    !complaintType ||
    !firstname ||
    !lastname ||
    !mobileNo ||
    !address ||
    !issueCategory ||
    !issueSubcategory ||
    !complaintDescription ||
    !imageUrl
  ) {
    res.status(400).send({ message: "Please add all fields" });
  }

  //Creating Complain
  const complaint = await Complaint.create({
    complaintType,
    firstname,
    lastname,
    mobileNo,
    address,
    issueCategory,
    issueSubcategory,
    complaintDescription,
    imageUrl,
  });

  if (complaint) {
    res.status(201).send({
      complaintType,
      firstname,
      lastname,
      mobileNo,
      address,
      issueCategory,
      issueSubcategory,
      complaintDescription,
      imageUrl,
    });
  } else {
    res.status(400).send({ error: "Invalid user data" });
  }
});
