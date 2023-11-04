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
    wardNo,
    area,
    assignedStaff,
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
    !imageUrl ||
    !wardNo ||
    !area ||
    !assignedStaff
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
    wardNo,
    area,
    assignedStaff,
    assignedStaffUsername,
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
      wardNo,
      area,
      assignedStaff,
      assignedStaffUsername,
      imageUrl,
    });
  } else {
    res.status(400).send({ error: "Invalid user data" });
  }
});

module.exports.fetchComplaints = asyncHandler(async (req, res) => {
  try {
    const complaint = await Complaint.find({
      assignedStaffUsername: req.body.username,
    });
    if (results.length > 0) {
      res.json(complaint);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(500).json({ error: "error occured while fetching complaints" });
  }
});
