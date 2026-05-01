const express = require("express");
const router = express.Router();
const {
  getProducts,
  createProduct
} = require("../controllers/productController");

const auth = require("../middleware/auth");

router.get("/", getProducts);

// admin protected route (you can improve later)
router.post("/", auth, createProduct);

module.exports = router;