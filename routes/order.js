const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');


router.post('/', orderController.addorder);
router.put('/:id', orderController.updateorder);
// router.delete('/:id', orderController.deleteOrder);
// router.get('/user/:id', orderController.getOrderByUserId);


module.exports = router;

