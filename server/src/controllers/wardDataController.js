const Categories = require("../models/categories");
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

module.exports.addCategories = asyncHandler(async (req, res) => {
  const { category, subCategory } = req.body;
  const wardData = await Categories.create({
    category,
    subCategory,
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

// module.exports.getallwards = asyncHandler(async(req, res))=> {

// }
