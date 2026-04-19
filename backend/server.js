const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const paymentRoutes = require("./routes/payment");
const userRoutes = require("./routes/users");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://dough-re-mi.vercel.app",
      /\.vercel\.app$/,
    ],
    credentials: true,
  }),
);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/users", userRoutes);

// Health check — keeps Render awake
app.get("/ping", (req, res) => res.send("pong"));

// Debug — print env vars exist (not their values)
console.log("ENV CHECK:");
console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);
console.log("RAZORPAY_KEY_ID exists:", !!process.env.RAZORPAY_KEY_ID);

if (!process.env.MONGO_URI) {
  console.error(
    "MONGO_URI is missing! Add it in Render environment variables.",
  );
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error(
    "JWT_SECRET is missing! Add it in Render environment variables.",
  );
  process.exit(1);
}

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
