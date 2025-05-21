import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:3300/api/usuarios/login'; // Ajusta la URL según tu backend

/**
 * Realiza login y almacena el token JWT recibido.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<object>} Datos del usuario autenticado (ej: token, usuario, etc)
 */
export const login = async (email, password) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.mensaje || 'Error de autenticación');
  }

  // Guarda el token en almacenamiento seguro
  await AsyncStorage.setItem('token', data.token);

  return data;
};

/**
 * Obtiene el token JWT almacenado.
 * @returns {Promise<string|null>}
 */
export const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

/**
 * Elimina el token JWT del almacenamiento (logout).
 */
export const logout = async () => {
  await AsyncStorage.removeItem('token');
};

/**
 * Realiza una petición autenticada con el token JWT.
 * @param {string} url
 * @param {object} options
 * @returns {Promise<any>}
 */
export const authFetch = async (url, options = {}) => {
  const token = await getToken();
  const headers = {
    ...(options.headers || {}),
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const res = await fetch(url, { ...options, headers });
  if (res.status === 401) {
    // Token inválido o expirado, puedes manejar logout automático aquí
    await logout();
    throw new Error('Sesión expirada. Por favor, inicia sesión de nuevo.');
  }
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.mensaje || 'Error en la solicitud');
  }
  return res.json();
};
