const mongoose = require("mongoose");

const wardDataSchema = new mongoose.Schema({
  area: {
    type: String,
    required: [true, "Please Enter Area"],
  },
  wardNo: {
    type: String,
    required: [true, "Please Enter ward number"],
  },
});

const WardDataModel = mongoose.model("WardData", wardDataSchema);
module.exports = WardDataModel;
