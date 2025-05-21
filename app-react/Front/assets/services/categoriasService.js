import { authFetch } from './authService';

export const obtenerCategorias = async () => {
  return authFetch('http://localhost:3300/api/categorias');
};

export const crearCategoria = async (nombre) => {
  return authFetch('http://localhost:3300/api/categorias', {
    method: 'POST',
    body: JSON.stringify({ nombre })
  });
};

export const borrarCategoria = async (id) => {
  return authFetch(`http://localhost:3300/api/categorias/${id}`, {
    method: 'DELETE'
  });
};

