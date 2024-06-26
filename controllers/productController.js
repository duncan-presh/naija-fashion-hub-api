const Product = require("../models/product");

// Add a new product
exports.addProduct = async (req, res) => {
  const { name, description, price, inventoryCount } = req.body;
  try {
    const product = new Product({ ...req.body });
    await product.save();

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

//update by ID
exports.updateProductById = async (req, res) => {
  const productId = req.params.id;
  console.log(productId);
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    for (const item in req.body) {
      product[item] = req.body[item];
    }
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

//delete by ID
exports.deleteProductById = async (req, res) => {
  const productId = req.params.id;
  console.log(productId);
  try {
    const product = await Product.findById(productId);
    console.log(product);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await Product.deleteOne({ _id: productId });
    res.status(200).json({message: "Product deleted successfully"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

