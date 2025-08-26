const { Router } = require('express');
const CartManager = require('../managers/CartManager');

const router = Router();
const carts = new CartManager();

// POST /api/carts/
router.post('/', async (req, res) => {
  try {
    const cart = await carts.createCart();
    res.status(201).json(cart);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/carts/:cid
router.get('/:cid', async (req, res) => {
  try {
    const cart = await carts.getById(req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart.products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/carts/:cid/product/:pid
router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const { quantity } = req.body || {};
    const cart = await carts.addProductToCart(req.params.cid, req.params.pid, quantity || 1);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.status(201).json(cart);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
