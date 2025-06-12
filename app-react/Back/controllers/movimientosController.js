const db = require('../db/db');

const registrarMovimiento = (req, res) => {
  console.log('Se recibe informacion del front')
  const { tipo, valor, categoria_id, usuario_id, fecha } = req.body;

  if (!tipo || !valor || !categoria_id || !usuario_id || !fecha) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
  }
  console.log('Antes de insertar')
  const query = `
    INSERT INTO movimientos (tipo, valor, categoria_id, usuario_id, fecha)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [tipo, valor, categoria_id, usuario_id, fecha], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ mensaje: 'Error al registrar movimiento' });
    }
    res.status(201).json({ mensaje: 'Movimiento registrado con éxito' });
  });
};

const obtenerMovimientosPorUsuario = (req, res) => {
  const usuarioId = req.params.usuarioId;

  const query = `
    SELECT m.*, c.nombre AS categoria
    FROM movimientos m
    JOIN categorias c ON m.categoria_id = c.id
    WHERE m.usuario_id = ?
    ORDER BY fecha DESC
  `;

  db.query(query, [usuarioId], (err, resultados) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ mensaje: 'Error al obtener movimientos' });
    }
    res.json(resultados);
  });
};

module.exports = {
  registrarMovimiento,
  obtenerMovimientosPorUsuario,
};
