const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/auth');
const {
  obtenerCategorias,
  crearCategoria,
  eliminarCategoria,
} = require('../controllers/categoriasController');

router.get('/:usuario_id', verificarToken, obtenerCategorias);
router.post('/', verificarToken, crearCategoria);
router.delete('/:id', verificarToken, eliminarCategoria);

module.exports = router;
