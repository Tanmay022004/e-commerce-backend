const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const Product = require("../models/Product");

// get all users/orders/products (example admin power)
router.get("/dashboard", auth, admin, (req, res) => {
  res.json({ msg: "Welcome Admin" });
});

// delete product
router.delete("/product/:id", auth, admin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ msg: "Product deleted" });
});

module.exports = router;