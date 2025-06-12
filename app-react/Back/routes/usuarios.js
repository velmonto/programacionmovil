const express = require('express');
const router = express.Router();
const { register, login, obtenerSaldo } = require('../controllers/usuariosController');
const verificarToken = require('../middlewares/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/saldo/:id', verificarToken, obtenerSaldo);

module.exports = router;
