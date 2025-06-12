const db = require('../db/db');

const obtenerCategorias = (req, res) => {
  const { usuario_id } = req.params;

  const query = 'SELECT * FROM categorias WHERE usuario_id = ? ORDER BY nombre';

  db.query(query, [usuario_id], (err, resultados) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ mensaje: 'Error al obtener categorías' });
    }
    res.json(resultados);
  });
};

const crearCategoria = (req, res) => {
  const { nombre, usuario_id } = req.body;

  if (!nombre || !usuario_id) {
    return res.status(400).json({ mensaje: 'Nombre y usuario_id son obligatorios' });
  }

  db.query(
    'SELECT * FROM categorias WHERE nombre = ? AND usuario_id = ?',
    [nombre, usuario_id],
    (err, resultados) => {
      if (resultados.length > 0) {
        return res.status(400).json({ mensaje: 'La categoría ya existe' });
      }

      db.query(
        'INSERT INTO categorias (nombre, usuario_id) VALUES (?, ?)',
        [nombre, usuario_id],
        (err, resultado) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ mensaje: 'Error al crear categoría' });
          }
          res.status(201).json({ mensaje: 'Categoría creada con éxito' });
        }
      );
    }
  );
};

const eliminarCategoria = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM categorias WHERE id = ?', [id], (err, resultado) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ mensaje: 'Error al eliminar categoría' });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }

    res.json({ mensaje: 'Categoría eliminada con éxito' });
  });
};

module.exports = {
  obtenerCategorias,
  crearCategoria,
  eliminarCategoria,
};
