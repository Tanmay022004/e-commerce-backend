const Order = require("../models/Order");
const Product = require("../models/Product");

exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    let total = 0;

    for (let item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ msg: "Out of stock" });
      }

      product.stock -= item.quantity;
      await product.save();

      total += product.price * item.quantity;
    }

    const order = await Order.create({
      user: req.user.id,
      items,
      total,
      status: "pending"
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: "Order not found" });

    order.status = status;
    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};