const Order = require("../models/Order");

exports.simulatePayment = async (req, res) => {
  const { orderId } = req.body;

  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json({ msg: "Order not found" });
  }

  if (order.status === "paid") {
    return res.status(400).json({ msg: "Already paid" });
  }

  const success = Math.random() > 0.2;

  if (!success) {
    return res.status(400).json({ msg: "Payment failed" });
  }

  order.status = "paid";
  await order.save();

  res.json({ msg: "Payment successful", order });
};