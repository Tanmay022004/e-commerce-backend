const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

router.post("/register", async (req, res) => {
  try {
    return res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ msg: "error" });
  }
});
router.post("/login", login);

module.exports = router;

