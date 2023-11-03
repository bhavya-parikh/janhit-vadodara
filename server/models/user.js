const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  addharid: {
    type: String,
    required: [true, "Please Enter Addhar Number"],
  },
  username: {
    type: String,
    required: [true, "Please Enter your username"],
  },
  password: {
    type: String,
    required: [true, "Please Enter your password"],
  },
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
