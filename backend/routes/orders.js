const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { protect, isAdmin } = require("../middleware/auth");

// POST /api/orders - place order
router.post("/", protect, async (req, res) => {
  try {
    const {
      items,
      totalAmount,
      deliveryAddress,
      paymentMethod,
      razorpayOrderId,
    } = req.body;
    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount,
      deliveryAddress,
      paymentMethod,
      razorpayOrderId: razorpayOrderId || null,
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/orders/my - get logged in user's orders
router.get("/my", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("items.product", "name image");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/orders/:id/pay - mark order as paid after razorpay success
router.patch("/:id/pay", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    order.paymentStatus = "paid";
    order.razorpayPaymentId = req.body.razorpayPaymentId;
    order.orderStatus = "placed";
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/orders/all - admin: get all orders
router.get("/all", protect, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .populate("user", "name email")
      .populate("items.product", "name");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/orders/:id/status - admin: update order status
router.patch("/:id/status", protect, isAdmin, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: req.body.orderStatus },
      { new: true },
    );
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
