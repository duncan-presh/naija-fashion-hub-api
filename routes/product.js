const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/', productController.addProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.patch('/:id', productController.updateProductById)
router.delete('/:id', productController.deleteProductById)



module.exports = router;
