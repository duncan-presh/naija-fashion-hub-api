const Subcategory = require('../models/Subcategory');
const Category = require('../models/Category');
const { validationResult } = require('express-validator');

exports.getSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate('category');
    res.json(subcategories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.createSubcategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, category } = req.body;

  try {
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ msg: 'Category not found' });
    }

    const newSubcategory = new Subcategory({
      name,
      category
    });

    const subcategory = await newSubcategory.save();

    // Add subcategory to the category's subcategories array
    categoryExists.subcategories.push(subcategory._id);
    await categoryExists.save();

    res.json(subcategory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
