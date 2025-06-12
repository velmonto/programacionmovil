import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://localhost:3300/api/movimientos'; // cambia si usas IP local

export const registrarMovimiento = async (movimiento) => {
  const token = await AsyncStorage.getItem('token');

  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(movimiento),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.mensaje || 'Error al registrar movimiento');
  }

  return data;
};

export const getMovimientos = async (usuarioId) => {
  const token = await AsyncStorage.getItem('token');

  const res = await fetch(`${BASE_URL}/${usuarioId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.mensaje || 'Error al obtener movimientos');
  }

  return data;
};
