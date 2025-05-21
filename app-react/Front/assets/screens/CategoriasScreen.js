import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { authFetch } from '../services/authService';
import { useNavigation } from '@react-navigation/native';

export default function CategoriasScreen() {
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const navigation = useNavigation();

  const cargarCategorias = async () => {
    try {
      const data = await authFetch('http://localhost:3300/api/categorias');
      setCategorias(data);
    } catch (error) {
      if (error.message.includes('Sesión expirada')) {
        navigation.replace('Login');
      }
      Alert.alert('Error', error.message);
    }
  };

  const agregarCategoria = async () => {
    if (!categoria.trim()) {
      Alert.alert('Error', 'Introduce un nombre válido');
      return;
    }

    try {
      await authFetch('http://localhost:3300/api/categorias', {
        method: 'POST',
        body: JSON.stringify({ nombre: categoria })
      });
      setCategoria('');
      cargarCategorias();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const eliminarCategoria = async (id) => {
    try {
      await authFetch(`http://localhost:3300/api/categorias/${id}`, {
        method: 'DELETE'
      });
      cargarCategorias();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  // El resto del componente y estilos permanece igual
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  categoriaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    marginBottom: 8,
  },
  categoriaTexto: { fontSize: 16 },
  eliminar: { color: 'red' },
});
