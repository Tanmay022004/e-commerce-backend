exports.simulatePayment = (req, res) => {
  const success = Math.random() > 0.2;

  if (!success) {
    return res.status(400).json({ msg: "Payment failed" });
  }

  res.json({ msg: "Payment successful" });
};