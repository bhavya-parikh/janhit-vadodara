const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  complaintType: {
    type: String,
    required: [true, "Please Choose Type"],
  },
  firstname: {
    type: String,
    required: [true, "Please Enter Addhar Number"],
  },
  lastname: {
    type: String,
    required: [true, "Please Enter Addhar Number"],
  },
  mobileNo: {
    type: String,
    required: [true, "Please Enter your Mobile Number"],
  },
  address: {
    type: String,
    required: [true, "Please Enter Address"],
  },
  issueCategory: {
    type: String,
    required: [true, "Please Select Issue Category"],
  },
  issueSubcategory: {
    type: String,
    required: [true, "Please Select Issue SubCategory"],
  },
  complaintDescription: {
    type: String,
    required: [true, "Please enter Complaint Description"],
  },
  wardNo: {
    type: String,
    required: [true, "Please enter Ward Number"],
  },
  area: {
    type: String,
    required: [true, "Please enter Area"],
  },
  assignedStaff: {
    type: String,
    required: [true, "Please enter Assigned Staff"],
  },
  imageUrl: [
    {
      type: String,
      required: [true, "Please Upload Image"],
    },
  ],
});

const ComplaintModel = mongoose.model("Complaint", complaintSchema);
module.exports = ComplaintModel;
