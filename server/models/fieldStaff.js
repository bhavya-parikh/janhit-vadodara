const mongoose = require("mongoose");

const fieldStaffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Name"],
  },
  username: {
    type: String,
    required: [true, "Please Enter username"],
  },
  password: {
    type: String,
    required: [true, "Please Give Password"],
  },
  wardNo: {
    type: String,
    required: [true, "Please Assign Ward No"],
  },
  category: {
    type: String,
    required: [true, "Please enter category"],
  },
});

const FieldStaffModel = mongoose.model("FieldStaff", fieldStaffSchema);
module.exports = FieldStaffModel;
