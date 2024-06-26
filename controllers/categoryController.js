const Category = require("../models/Category");

// Add a new category
exports.addCategory = async (req, res) => {
  // const { name, gender } = req.body;
  try {
    // const category = new Category({...req.body});
    // await category.save();
    const category = await Category.findOneAndUpdate(
      // { gender: req.body.gender, name: req.body.name },
      req.body,
      { upsert: true, new: true }
    );

    res.status(201).json({ message: "Category added successfully", category });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
