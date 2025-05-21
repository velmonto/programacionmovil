const express = require('express');
const router = express.Router();
const { registrarMovimiento, obtenerMovimientosPorUsuario } = require('../controllers/movimientosController');

router.post('/', registrarMovimiento);
router.get('/:usuarioId', obtenerMovimientosPorUsuario);

module.exports = router;
