import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://localhost:3300'; 

export const fetchWithToken = async (endpoint, method = 'GET', body = null) => {
  const token = await AsyncStorage.getItem('token');

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || 'Error en la petición');
  }

  return data;
};
