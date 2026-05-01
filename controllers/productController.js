const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  const { keyword, category } = req.query;

  let filter = {};
  if (keyword) filter.name = { $regex: keyword, $options: "i" };
  if (category) filter.category = category;

  const products = await Product.find(filter);
  res.json(products);
};

exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
};