const db = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { nombre, correo, contraseña } = req.body;

  // Validar datos
  if (!nombre || !correo || !contraseña) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
  }

  // Verificar si el correo ya existe
  db.query('SELECT * FROM usuarios WHERE correo = ?', [correo], async (err, resultados) => {
    if (resultados.length > 0) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    // Encriptar la contraseña
    const contraseñaHasheada = await bcrypt.hash(contraseña, 10);

    // Insertar usuario
    db.query(
      'INSERT INTO usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)',
      [nombre, correo, contraseñaHasheada],
      (err, resultado) => {
        if (err) return res.status(500).json({ mensaje: 'Error al registrar' });
        res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
      }
    );
  });
};

const login = (req, res) => {
  const { correo, contraseña } = req.body;

  db.query('SELECT * FROM usuarios WHERE correo = ?', [correo], async (err, resultados) => {
    if (err || resultados.length === 0) {
      return res.status(401).json({ mensaje: 'Correo o contraseña inválidos' });
    }

    const usuario = resultados[0];
    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!contraseñaValida) {
      return res.status(401).json({ mensaje: 'Correo o contraseña inválidos' });
    }

    // Crear token (opcional, útil para apps reales)
    const token = jwt.sign({ id: usuario.id, correo: usuario.correo }, 'CLAVESECRETA', {
      expiresIn: '1h',
    });

    res.json({ mensaje: 'Login correcto', token });
  });
};

module.exports = { register, login };
