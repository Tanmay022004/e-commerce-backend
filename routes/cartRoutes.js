const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// fake cart stored per request (upgrade later to DB)
let carts = {};

router.post("/add", auth, (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  if (!carts[userId]) carts[userId] = [];

  carts[userId].push({ productId, quantity });

  res.json({ msg: "Added to cart", cart: carts[userId] });
});

router.get("/", auth, (req, res) => {
  const userId = req.user.id;
  res.json(carts[userId] || []);
});

module.exports = router;