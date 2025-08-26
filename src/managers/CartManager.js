const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');

const CARTS_PATH = path.join(__dirname, '../../data/carts.json');

async function ensureFile(filePath) {
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, '[]', 'utf-8');
  }
}

class CartManager {
  constructor(filePath = CARTS_PATH) {
    this.filePath = filePath;
  }

  async _read() {
    await ensureFile(this.filePath);
    const data = await fs.readFile(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  async _write(json) {
    await fs.writeFile(this.filePath, JSON.stringify(json, null, 2), 'utf-8');
  }

  async createCart() {
    const carts = await this._read();
    const newCart = {
      id: nanoid(10),
      products: [] // array de { product: productId, quantity: number }
    };
    carts.push(newCart);
    await this._write(carts);
    return newCart;
  }

  async getById(id) {
    const carts = await this._read();
    return carts.find(c => String(c.id) === String(id)) || null;
  }

  async addProductToCart(cartId, productId, qty = 1) {
    const carts = await this._read();
    const idx = carts.findIndex(c => String(c.id) === String(cartId));
    if (idx === -1) return null;

    const cart = carts[idx];
    const itemIdx = cart.products.findIndex(i => String(i.product) === String(productId));

    if (itemIdx === -1) {
      cart.products.push({ product: String(productId), quantity: Number(qty) || 1 });
    } else {
      cart.products[itemIdx].quantity += Number(qty) || 1;
    }

    carts[idx] = cart;
    await this._write(carts);
    return cart;
  }
}

module.exports = CartManager;
