const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const db = require('./db/db');
const app = express();
const usuariosRoutes = require('./routes/usuarios');
const movimientosRoutes = require('./routes/movimientos');
const categoriasRoutes = require('./routes/categorias');

app.use(cors());
app.use(express.json());
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/movimientos', movimientosRoutes);
app.use('/api/categorias', categoriasRoutes);

app.get('/', (req, res) => {
  res.send('API de Finanzas funcionando');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
