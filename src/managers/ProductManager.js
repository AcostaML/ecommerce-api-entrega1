const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');

const PRODUCTS_PATH = path.join(__dirname, '../../data/products.json');

async function ensureFile(filePath) {
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, '[]', 'utf-8');
  }
}

class ProductManager {
  constructor(filePath = PRODUCTS_PATH) {
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

  async getAll() {
    return this._read();
  }

  async getById(id) {
    const products = await this._read();
    return products.find(p => String(p.id) === String(id)) || null;
  }

  async add(productData) {
    const products = await this._read();

    
    const required = ['title', 'description', 'code', 'price', 'stock', 'category'];
    for (const field of required) {
      if (productData[field] === undefined || productData[field] === null) {
        throw new Error(`Campo obligatorio faltante: ${field}`);
      }
    }

    
    if (products.some(p => p.code === productData.code)) {
      throw new Error('Ya existe un producto con ese code');
    }

    const newProduct = {
      id: nanoid(10), 
      title: productData.title,
      description: productData.description,
      code: productData.code,
      price: Number(productData.price),
      status: productData.status !== undefined ? Boolean(productData.status) : true,
      stock: Number(productData.stock),
      category: productData.category,
      thumbnails: Array.isArray(productData.thumbnails) ? productData.thumbnails : []
    };

    products.push(newProduct);
    await this._write(products);
    return newProduct;
  }

  async update(id, updates) {
    const products = await this._read();
    const idx = products.findIndex(p => String(p.id) === String(id));
    if (idx === -1) return null;

    
    const { id: _ignoreId, ...rest } = updates;
    const updated = { ...products[idx], ...rest };
    products[idx] = updated;
    await this._write(products);
    return updated;
  }

  async delete(id) {
    const products = await this._read();
    const idx = products.findIndex(p => String(p.id) === String(id));
    if (idx === -1) return false;
    products.splice(idx, 1);
    await this._write(products);
    return true;
  }
}

module.exports = ProductManager;
