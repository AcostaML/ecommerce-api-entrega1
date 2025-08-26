const express = require('express');
const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router');

const app = express();

// Middlewares
app.use(express.json());

// Rutas base
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Healthcheck opcional
app.get('/', (_req, res) => res.json({ status: 'ok', service: 'ecommerce-api' }));

// Puerto 8080
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
