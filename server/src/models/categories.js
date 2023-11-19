const mongoose = require("mongoose");
const categoriesSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, "Please Enter your Name"],
  },
  subCategory: {
    type: String,
    required: [true, "Please Enter your username"],
  },
});
const CategoriesModel = mongoose.model("Categories", categoriesSchema);
module.exports = CategoriesModel;
