const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/auth');
const { registrarMovimiento, obtenerMovimientosPorUsuario } = require('../controllers/movimientosController');

router.post('/', verificarToken, registrarMovimiento);
router.get('/:usuarioId', verificarToken, obtenerMovimientosPorUsuario);

module.exports = router;
