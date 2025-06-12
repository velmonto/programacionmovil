import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://localhost:3300/api/usuarios';

export const getSaldo = async (usuarioId) => {
  const token = await AsyncStorage.getItem('token');

  const res = await fetch(`${BASE_URL}/saldo/${usuarioId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.mensaje || 'Error al obtener saldo');
  return data.saldo;
};
