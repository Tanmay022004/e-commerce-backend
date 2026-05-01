const Product = require("../models/Product");

let carts = {}; // replace with DB in real system

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    if (!carts[userId]) carts[userId] = [];

    carts[userId].push({
      productId,
      quantity
    });

    res.json({ msg: "Added to cart", cart: carts[userId] });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getCart = (req, res) => {
  try {
    const userId = req.user.id;
    res.json(carts[userId] || []);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.clearCart = (req, res) => {
  try {
    const userId = req.user.id;
    carts[userId] = [];
    res.json({ msg: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};