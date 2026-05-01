const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

exports.getDashboardStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const products = await Product.countDocuments();
    const orders = await Order.countDocuments();

    res.json({
      users,
      products,
      orders
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "User deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};