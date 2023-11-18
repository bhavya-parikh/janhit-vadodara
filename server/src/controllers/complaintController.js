const Complaint = require("../models/complaint");
const userModel = require("../models/user");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

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
  const images = req.files.map((file) => file.path);
  if (
    !complaintType ||
    !firstname ||
    !lastname ||
    !mobileNo ||
    !address ||
    !issueCategory ||
    !issueSubcategory ||
    !complaintDescription ||
    !images.length ||
    !wardNo ||
    !area ||
    !assignedStaff ||
    !assignedStaffUsername
  ) {
    res.status(400).send({ message: "Please add all fields" });
  }
  if (!req.cookies.token) {
    res.status(400).send({ message: "Login First To Do Complaint" });
  }

  //Creating Complain

  const token = req.cookies.token;
  var username = "";
  if (token) {
    try {
      // Verify and decode the JWT token
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      // Fetch user information based on the decoded user ID using the provided user model
      const user = await userModel.findById(decoded.id._id);
      if (!user) {
        res.status(401).send({ message: "Not authorized, user not found" });
      } else {
        username = decoded.id.username;
      }
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "Something went wrong!" });
    }
  }

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
    images,
    username,
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
      images,
      username,
    });
  } else {
    res.status(400).send({ error: "Invalid user data" });
  }
});

module.exports.fetchComplaintsAdmin = asyncHandler(async (req, res) => {
  try {
    const token = req.cookies.token;
    if (token) {
      try {
        // Verify and decode the JWT token
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        if (decoded.id.role === "user") {
          res.status(400).send({ message: "Dashboard is only for admins" });
        }
        const complaint = await Complaint.find({
          assignedStaffUsername: decoded.id.username,
        });
        res.status(200).send(complaint);
      } catch (error) {
        res.status(500).send(error);
      }
    } else {
      res.status(400).send({ message: "Login First To Access The Dashboard!" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports.fetchComplaintsUser = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    try {
      // Verify and decode the JWT token
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      const complaintsList = await Complaint.find({
        username: decoded.id.username,
      }).exec();
      res.json(complaintsList);
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "Something went wrong!" });
    }
  }
});

module.exports.updateComplaintStatus = asyncHandler(async (req, res) => {
  try {
    const complaintStatus = req.body.newStatus;
    if (complaintStatus === "Completed") {
      const complaint = await Complaint.findOne({ _id: req.body.complaintId });
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
