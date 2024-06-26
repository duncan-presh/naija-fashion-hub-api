const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const subcategoryController = require('../controllers/subcategoryController');

// @route   GET /api/subcategories
// @desc    Get all subcategories
// @access  Public
router.get('/', subcategoryController.getSubcategories);

// @route   POST /api/subcategories
// @desc    Create a subcategory
// @access  PrivateA
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty()
  ],
  subcategoryController.createSubcategory
);

module.exports = router;
