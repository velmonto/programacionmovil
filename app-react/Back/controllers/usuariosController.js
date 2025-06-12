const db = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { nombre, correo, contraseña } = req.body;

  // Validar datos
  if (!nombre || !correo || !contraseña) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
  }

  console.log('Inicia consulta de usuario antes de registrar');
  db.query('SELECT * FROM usuarios WHERE correo = ?', [correo], async (err, resultados) => {
    if (resultados.length > 0) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    const contraseñaHasheada = await bcrypt.hash(contraseña, 10);

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
    console.log('Intentando login con:', correo);
    console.log('Resultados SQL:', resultados);
    const usuario = resultados[0];
    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
    console.log(usuario);
    if (!contraseñaValida) {
      return res.status(401).json({ mensaje: 'Correo o contraseña inválidos' });
    }

    const token = jwt.sign({ id: usuario.id, correo: usuario.correo }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ mensaje: 'Login correcto', token });
  });
};

module.exports = { register, login };
