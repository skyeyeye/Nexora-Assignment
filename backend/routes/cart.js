const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

// GET /api/cart -> returns cart items populated with product + total
router.get('/', async (req, res) => {
  try {
    const items = await CartItem.find({}).populate('product');
    const total = items.reduce((acc, it) => acc + it.product.price * it.qty, 0);
    res.json({ items, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// POST /api/cart -> { productId, qty }
router.post('/', async (req, res) => {
  try {
    const { productId, qty } = req.body;
    if (!productId || !qty) return res.status(400).json({ error: 'productId and qty required' });

    // If same product exists in cart, increase qty
    let existing = await CartItem.findOne({ product: productId });
    if (existing) {
      existing.qty += qty;
      await existing.save();
      const populated = await existing.populate('product');
      return res.status(200).json(populated);
    }

    const item = new CartItem({ product: productId, qty });
    await item.save();
    await item.populate('product');
    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

// DELETE /api/cart/:id -> remove cart item by cart item id
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await CartItem.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Cart item not found' });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to remove item' });
  }
});

// POST /api/checkout -> { cartItems } returns mock receipt
router.post('/checkout', async (req, res) => {
  try {
    const { cartItems, name, email } = req.body;
    // validate cartItems exist and compute total
    if (!Array.isArray(cartItems)) return res.status(400).json({ error: 'cartItems array required' });

    // Optionally: verify items in DB and compute real total
    const ids = cartItems.map(ci => ci._id);
    const stored = await CartItem.find({ _id: { $in: ids } }).populate('product');
    const total = stored.reduce((acc, it) => acc + it.product.price * it.qty, 0);

    const receipt = {
      buyer: { name: name || 'Guest', email: email || '' },
      total,
      items: stored.map(it => ({ name: it.product.name, qty: it.qty, price: it.product.price })),
      timestamp: new Date().toISOString(),
      receiptId: `RCT-${Date.now()}`
    };

    // For a mock checkout we can empty the cart
    await CartItem.deleteMany({ _id: { $in: ids } });

    res.json({ receipt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Checkout failed' });
  }
});

module.exports = router;
