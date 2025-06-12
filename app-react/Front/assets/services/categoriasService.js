import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://localhost:3300/api/categorias'; 

// ✅ Obtener categorías del usuario
export const getCategorias = async (usuarioId) => {
  const token = await AsyncStorage.getItem('token');

  const res = await fetch(`${BASE_URL}/${usuarioId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.mensaje || 'Error al obtener categorías');
  return data;
};

// ✅ Crear una categoría (enviando nombre y usuario_id en el body)
export const crearCategoria = async (nombre, usuarioId) => {
  const token = await AsyncStorage.getItem('token');

  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ nombre, usuario_id: usuarioId }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.mensaje || 'Error al crear categoría');
  return data;
};

// ✅ Eliminar categoría por ID
export const eliminarCategoria = async (id) => {
  const token = await AsyncStorage.getItem('token');

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.mensaje || 'Error al eliminar categoría');
  return data;
};
