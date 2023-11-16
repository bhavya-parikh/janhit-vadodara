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
    assignedStaffUsername,
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
    !assignedStaff ||
    !assignedStaffUsername
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
      assignedStaffUsername: req.body.assignedStaffUsername,
    });
    res.status(200).send(complaint);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports.updateComplaintStatus = asyncHandler(async (req, res) => {
  try {
    const complaintStatus = req.body.newStatus;
    if (complaintStatus === "Completed") {
      const complaint = await Complaint.findOne({ _id: req.body.complaintId });
      console.log(complaint);
      if (!complaint.imageFieldStaff) {
        return res.send(404).json({ error: "Upload Image First!" });
      }
    }
    const complaint = await Complaint.updateOne(
      { _id: req.body.complaintId },
      {
        $set: {
          complaintStatus: req.body.newStatus,
        },
      }
    );
    res.status(200).send(complaint);
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
});

module.exports.addimage = asyncHandler(async (req, res) => {
  try {
    const complaint = await Complaint.updateOne(
      { _id: req.body.complaintId },
      {
        $set: {
          imageFieldStaff: req.file.path,
        },
      }
    );
    res.status(200).send(complaint);
  } catch (err) {
    res.status(404).send("Unable To Update Right Now!");
  }
});
