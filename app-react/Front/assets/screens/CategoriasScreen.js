import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TextInput, Button, StyleSheet, Alert, TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode as atob } from 'base-64';
import {
  getCategorias,
  crearCategoria,
  eliminarCategoria
} from '../services/categoriasService';

export default function CategoriasScreen() {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState('');
  const [usuarioId, setUsuarioId] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const payload = JSON.parse(atob(token.split('.')[1]));
        const id = payload.id;
        setUsuarioId(id);

        const data = await getCategorias(id);
        setCategorias(data);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };
    cargar();
  }, []);

  const handleCrear = async () => {
    if (!nombre) return Alert.alert('Error', 'Nombre requerido');

    try {
      await crearCategoria(nombre, usuarioId);
      setNombre('');
      const data = await getCategorias(usuarioId);
      setCategorias(data);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleEliminar = async (id) => {
    try {
      await eliminarCategoria(id);
      const data = await getCategorias(usuarioId);
      setCategorias(data);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.nombre}</Text>
      <TouchableOpacity onPress={() => handleEliminar(item.id)}>
        <Text style={styles.eliminar}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestionar Categorías</Text>

      <TextInput
        placeholder="Nombre de la categoría"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <Button title="Agregar" onPress={handleCrear} />

      <FlatList
        data={categorias}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No hay categorías aún</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, marginBottom: 15 },
  input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  eliminar: { color: 'red' },
});
