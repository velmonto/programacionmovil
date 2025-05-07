import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function CategoriasScreen() {
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState(['Alimentación', 'Transporte', 'Educación']);

  const agregarCategoria = () => {
    if (!categoria.trim()) {
      Alert.alert('Error', 'Introduce un nombre válido');
      return;
    }

    if (categorias.includes(categoria.trim())) {
      Alert.alert('Ya existe', 'Esta categoría ya está en la lista');
      return;
    }

    setCategorias([...categorias, categoria.trim()]);
    setCategoria('');
  };

  const eliminarCategoria = (nombre) => {
    Alert.alert(
      'Eliminar',
      `¿Deseas eliminar la categoría "${nombre}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => {
            setCategorias(categorias.filter(c => c !== nombre));
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Categorías</Text>
      <TextInput
        style={styles.input}
        placeholder="Nueva categoría"
        value={categoria}
        onChangeText={setCategoria}
      />
      <Button title="Agregar" onPress={agregarCategoria} />

      <FlatList
        data={categorias}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.categoriaItem}>
            <Text style={styles.categoriaTexto}>{item}</Text>
            <TouchableOpacity onPress={() => eliminarCategoria(item)}>
              <Text style={styles.eliminar}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
        style={{ marginTop: 20 }}
      />
    </View>
  );
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
