const Order = require('../models/order');
const Cart = require('../models/cart');
const Product = require('../models/product');
const auth = require('../middleware/authmiddleware');


// Place an order
exports.addorder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart) return res.status(400).json({ msg: 'No items in cart' });

    const totalAmount = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    const order = new Order({
      user: req.user.id,
      items: cart.items,
      totalAmount,
    });

    await order.save();
    await Cart.findOneAndRemove({ user: req.user.id });

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Admin: Approve an order
exports.updateorder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ msg: 'Order not found' });

    order.status = 'approved';
    await order.save();

    // Reduce stock levels
    for (const item of order.items) {
      const product = await Product.findById(item.product);
      product.stock -= item.quantity;
      await product.save();
    }

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Admin: Reject an order
exports.putorder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ msg: 'Order not found' });

    order.status = 'rejected';
    await order.save();

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all orders (admin only)
exports.getorder = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', ['username', 'email']);
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get user's orders
exports.getorder = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};



