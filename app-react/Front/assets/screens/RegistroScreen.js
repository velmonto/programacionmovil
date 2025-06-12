import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { registrarMovimiento } from '../services/movimientosService';
import { getCategorias, obtenerCategorias } from '../services/categoriasService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegistroScreen({ navigation }) {
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('ingreso');
  const [categorias, setCategorias] = useState([]);
  const [categoriaId, setCategoriaId] = useState('');
  const [usuarioId, setUsuarioId] = useState(null);

 useEffect(() => {
  const cargarCategorias = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUsuarioId(payload.id);
      console.log("Se inicia carrga de categorias",usuarioId);
      const data = await getCategorias(payload.id);
      setCategorias(data);
      if (data.length > 0) setCategoriaId(data[0].id.toString());
    } catch (error) {
      console.error('Error al cargar categorías:', error.message);
    }
  };

  cargarCategorias();
}, []);

  const handleRegistrar = async () => {
    console.log('Inicia registro de movimientos');
    if (!valor || isNaN(valor) || !categoriaId) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }
    console.log('se capturan los datos',tipo, valor, categoriaId, usuarioId);
    try {
      const movimiento = {
        tipo,
        valor: parseFloat(valor),
        categoria_id: parseInt(categoriaId),
        usuario_id: usuarioId,
        fecha: new Date().toISOString().slice(0, 19).replace('T', ' ')
      };
      console.log(movimiento);
      console.log('Antes de enviar informacion al back');
      await registrarMovimiento(movimiento);
      Alert.alert('Éxito', 'Movimiento guardado');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Movimiento</Text>

      <TextInput
        placeholder="Valor"
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
        style={styles.input}
      />

      <Text style={styles.label}>Tipo:</Text>
      <Picker selectedValue={tipo} onValueChange={(v) => setTipo(v)} style={styles.picker}>
        <Picker.Item label="Ingreso" value="ingreso" />
        <Picker.Item label="Egreso" value="egreso" />
      </Picker>

      <Text style={styles.label}>Categoría:</Text>
      <Picker selectedValue={categoriaId} onValueChange={(value) => setCategoriaId(value)} style={styles.picker}>
        {categorias.map((cat) => (
          <Picker.Item key={cat.id} label={cat.nombre} value={cat.id.toString()} />
        ))}
      </Picker>

      <Button title="Registrar" onPress={handleRegistrar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5 },
  label: { fontSize: 16, marginTop: 10 },
  picker: { borderWidth: 1, marginBottom: 20 },
});
