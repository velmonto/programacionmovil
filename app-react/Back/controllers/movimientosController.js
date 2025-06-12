const db = require('../db/db');

const registrarMovimiento = (req, res) => {
  const { valor, tipo, categoria_id, usuario_id, fecha } = req.body;

  if (!valor || !tipo || !categoria_id || !usuario_id || !fecha) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
  }

  const query = `
    INSERT INTO movimientos (valor, tipo, categoria_id, usuario_id, fecha)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [valor, tipo, categoria_id, usuario_id, fecha], (err) => {
    if (err) return res.status(500).json({ mensaje: 'Error al registrar movimiento' });

    const signo = tipo === 'ingreso' ? '+' : '-';
    db.query(
      `UPDATE usuarios SET saldo = saldo ${signo} ? WHERE id = ?`,
      [valor, usuario_id],
      (err2) => {
        if (err2) return res.status(500).json({ mensaje: 'Error al actualizar saldo' });
        res.status(201).json({ mensaje: 'Movimiento registrado y saldo actualizado' });
      }
    );
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
