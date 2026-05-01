const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const { createOrder } = require("../controllers/orderController");

router.post("/", auth, createOrder);

module.exports = router;