const Categories = require("../models/categories");
const WardData = require("../models/wardData");
const asyncHandler = require("express-async-handler");

module.exports.fetchWardData = asyncHandler(async (req, res) => {
  const wardData = await WardData.findOne({ area: req.body.area });
  res.status(201).send({ wardNo: wardData.wardNo });
});

module.exports.fetchWardAreas = asyncHandler(async (req, res) => {
  const wardAreas = await WardData.find({ wardNo: req.body.wardNo });
  const areas = wardAreas.map((item)=>item.area);
  res.status(201).send({ areas });
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

module.exports.fetchAllWardAreas = asyncHandler(async (req, res) => {
  const wardAreas = await WardData.find();
  const wardDatas = wardAreas.map((item) => ({
    "area": item.area,
    "wardNo": item.wardNo,
  }));
  res.status(201).send( {wardDatas} );
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


module.exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await Categories.find();
  const categoriesData = categories.map((item) => ({
    "category": item.category,
  }));
  if (categoriesData) {
    res.status(201).send({
      categoriesData
    });
  } else {
    res.status(404).send({
      message: "Categories not found,Server Error!",
    });
  }
});

module.exports.getCategorySubCategories = asyncHandler(async (req, res) => {
  const categories = await Categories.find();
  const categoriesData = categories.map((item) => ({
    "category": item.category,
    "subCategory": item.subCategory
  }));
  if (categoriesData) {
    res.status(201).send({
      categoriesData
    });
  } else {
    res.status(404).send({
      message: "Categories not found,Server Error!",
    });
  }
});
// module.exports.getallwards = asyncHandler(async(req, res))=> {

// }
