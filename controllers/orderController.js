const Order = require("../models/Order");
const Product = require("../models/Product");

exports.createOrder = async (req, res) => {
  const { items } = req.body;

  let total = 0;

  for (let item of items) {
    const product = await Product.findById(item.product);

    if (!product || product.stock < item.quantity) {
      return res.status(400).json({ msg: "Out of stock" });
    }

    product.stock -= item.quantity;
    await product.save();

    total += product.price * item.quantity;
  }

  const order = await Order.create({
    user: req.user.id,
    items,
    total
  });

  res.json(order);
};