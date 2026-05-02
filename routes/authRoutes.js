const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

router.post("/register", (req, res) => {
  res.json({ msg: "register route works" });
});
router.post("/login", login);

module.exports = router;