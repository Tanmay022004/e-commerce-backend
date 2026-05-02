require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


// ✅ CORS (final working setup)
app.use(cors({
  origin: "http://127.0.0.1:5500",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Handle preflight requests
app.options("*", cors());


// ✅ Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));


// ✅ Test route
app.get("/test", (req, res) => {
  res.json({ ok: true });
});

// ✅ Root route
app.get("/", (req, res) => {
  res.json({
    message: "E-commerce Backend API",
    status: "running"
  });
});


// ✅ DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected ✅"))
  .catch(err => {
    console.error("DB Connection Failed ❌");
    console.error(err);
  });


// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});