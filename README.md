# Ecommerce API – Entrega 1 (Productos y Carritos)

Este repositorio contiene una API en Node.js + Express para gestionar productos y carritos de compra. 

## Objetivos
- Servidor Express en puerto 8080.
- Rutas separadas con Router: `/api/products` y `/api/carts`.
- Persistencia en archivos JSON.
- Managers para encapsular la lógica de acceso a datos: `ProductManager` y `CartManager`.

## Stack
- Node.js 18+
- Express 4
- nanoid (para IDs únicos)
- FS (persistencia en archivos)

## Estructura
Proyecto Backend
├─ package.json
├─ .gitignore
├─ src/
│ ├─ server.js
│ ├─ routes/
│ │ ├─ products.router.js
│ │ └─ carts.router.js
│ └─ managers/
│ ├─ ProductManager.js
│ └─ CartManager.js
└─ data/
├─ products.json
└─ carts.json
