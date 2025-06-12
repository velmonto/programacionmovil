import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:3300/api/usuarios'; 


export const login = async (correo, contraseña) => {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo, contraseña }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.mensaje || 'Error de autenticación');
  }

  // Guarda el token en almacenamiento seguro
  await AsyncStorage.setItem('token', data.token);

  return data;
};

export const logout = async () => {
  await AsyncStorage.removeItem('token');
};

export const register = async (nombre, correo, contraseña) => {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, correo, contraseña }),
  });
    console.log('Antes de enviar mensaje al back');
  const data = await res.json();
console.log('despues de enviar mensaje al back');
  if (!res.ok) {
    throw new Error(data.mensaje || 'Registro fallido');
  }

  return data;
};
