const { Router } = require('express');
const ProductManager = require('../managers/ProductManager');

const router = Router();
const products = new ProductManager();

// GET /api/products/
router.get('/', async (req, res) => {
  try {
    const all = await products.getAll();
    res.json(all);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/products/:pid
router.get('/:pid', async (req, res) => {
  try {
    const prod = await products.getById(req.params.pid);
    if (!prod) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(prod);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/products/
router.post('/', async (req, res) => {
  try {
    const created = await products.add(req.body);
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// PUT /api/products/:pid
router.put('/:pid', async (req, res) => {
  try {
    const updated = await products.update(req.params.pid, req.body);
    if (!updated) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// DELETE /api/products/:pid
router.delete('/:pid', async (req, res) => {
  try {
    const ok = await products.delete(req.params.pid);
    if (!ok) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ status: 'deleted' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
