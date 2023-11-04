const WardData = require("../models/wardData");
const asyncHandler = require("express-async-handler");

module.exports.fetchWardData = asyncHandler(async (req, res) => {
  const wardData = await WardData.findOne({ area: req.body.area });
  res.status(201).send({ wardNo: wardData.wardNo });
});

module.exports.addWardData = asyncHandler(async (req, res) => {
  const { area, wardNo } = req.body;
  const wardData = await WardData.create({
    area,
    wardNo,
  });
  if (wardData) {
    res.status(201).send({
      message: "Data Added Successfully",
    });
  } else {
    res.status(404).send({
      message: "Data not Added",
    });
  }
});
