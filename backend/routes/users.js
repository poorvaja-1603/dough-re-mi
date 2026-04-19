const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// GET /api/users/profile
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('cart.product');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/users/profile
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, profilePic } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, profilePic },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/users/cart - sync entire cart
router.put('/cart', protect, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { cart: req.body.cart },
      { new: true }
    ).populate('cart.product');
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/users/addresses - add address
router.post('/addresses', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.savedAddresses.push(req.body);
    await user.save();
    res.json(user.savedAddresses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/users/addresses/:index
router.delete('/addresses/:index', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.savedAddresses.splice(req.params.index, 1);
    await user.save();
    res.json(user.savedAddresses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
