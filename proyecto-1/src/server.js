const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');

// Configurar variables de entorno
dotenv.config();

// Middleware para el manejo de datos JSON
app.use(express.json());

// Rutas y controladores
const { getData, saveData } = require('./dataManager');

// Obtener todos los productos
app.get('/productos', (req, res) => {
  const data = getData();
  res.json(data.productos);
});

// Obtener un producto por su ID
app.get('/productos/:id', (req, res) => {
  const data = getData();
  const producto = data.productos.find(p => p.id === parseInt(req.params.id));
  if (producto) {
    res.json(producto);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Crear un nuevo producto
app.post('/productos', (req, res) => {
  const data = getData();
  const nuevoProducto = {
    id: data.productos.length + 1,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    sector: req.body.sector,
    pais: req.body.pais
  };
  data.productos.push(nuevoProducto);
  saveData(data);
  res.status(201).json(nuevoProducto);
});

// Actualizar un producto
app.put('/productos/:id', (req, res) => {
  const data = getData();
  const producto = data.productos.find(p => p.id === parseInt(req.params.id));
  if (producto) {
    producto.nombre = req.body.nombre;
    producto.descripcion = req.body.descripcion;
    producto.sector = req.body.sector;
    producto.pais =  req.body.pais;
    saveData(data);
    res.json(producto);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Eliminar un producto
app.delete('/productos/:id', (req, res) => {
  const data = getData();
  const index = data.productos.findIndex(p => p.id === parseInt(req.params.id));
  if (index !== -1) {
    const productoEliminado = data.productos.splice(index, 1)[0];
    saveData(data);
    res.json(productoEliminado);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});

