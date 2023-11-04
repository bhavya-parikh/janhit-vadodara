const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your Name"],
  },
  username: {
    type: String,
    required: [true, "Please Enter your username"],
  },
  password: {
    type: String,
    required: [true, "Please Enter your password"],
  },
  role: {
    type: String,
    required: [true, "Role Not Valid"],
  },
});

const AdminModel = mongoose.model("Admin", adminSchema);
module.exports = AdminModel;
