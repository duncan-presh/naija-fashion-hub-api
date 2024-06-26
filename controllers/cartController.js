const Cart = require('../models/cart');
const Product = require('../models/product');

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.userId
  try {
    let cart = await Cart.findOne({ user: req.user.userId})

    console.log("Cart: ", cart)
    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }


    const productIndex = cart.products.findIndex(p => p.productId.toString() === productId.toString());

console.log("ProductIndex: ", productIndex)
    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }
    console.log(cart)
    await cart.save();
    res.json({ message: 'Product added to cart successfully', cart });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
