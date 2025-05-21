import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Picker } from 'react-native';

export default function RegistroScreen({ navigation }) {
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('ingreso');
  const [categoria, setCategoria] = useState('Alimentación');

  // Simulación de categorías preexistentes
  const categoriasDisponibles = ['Alimentación', 'Transporte', 'Salud', 'Educación', 'Otros'];

  const handleRegistrar = () => {
    if (!valor || isNaN(valor)) {
      Alert.alert('Error', 'Introduce un valor numérico válido');
      return;
    }

    const nuevoMovimiento = {
      tipo,
      valor: parseFloat(valor),
      categoria,
      fecha: new Date().toISOString(),
    };

    console.log('Movimiento registrado:', nuevoMovimiento);

    Alert.alert('Éxito', `Movimiento ${tipo} registrado`);
    navigation.goBack(); // volver al Dashboard
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar {tipo}</Text>

      <TextInput
        style={styles.input}
        placeholder="Valor"
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
      />

      <Text style={styles.label}>Tipo:</Text>
      <Picker selectedValue={tipo} onValueChange={(itemValue) => setTipo(itemValue)} style={styles.picker}>
        <Picker.Item label="Ingreso" value="ingreso" />
        <Picker.Item label="Egreso" value="egreso" />
      </Picker>

      <Text style={styles.label}>Categoría:</Text>
      <Picker selectedValue={categoria} onValueChange={(itemValue) => setCategoria(itemValue)} style={styles.picker}>
        {categoriasDisponibles.map((cat) => (
          <Picker.Item key={cat} label={cat} value={cat} />
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
