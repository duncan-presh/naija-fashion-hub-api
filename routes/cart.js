const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const cartController = require('../controllers/cartController');
const {authMiddleware} = require('../middleware/authmiddleware');

// @route   POST /api/cart
// @desc    Add product to cart
// @access  Private
router.post(
  '/',
  authMiddleware,
  [
    check('productId', 'Product ID is required').not().isEmpty(),
    check('quantity', 'Quantity is required').isInt({ min: 1 })
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  cartController.addToCart
);

module.exports = router;
