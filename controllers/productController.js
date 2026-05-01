const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  try {
    const { keyword, category } = req.query;

    let filter = {};

    if (keyword) {
      filter.name = { $regex: keyword, $options: "i" };
    }

    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter);

    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: "Product deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};