import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { register } from '../services/authService';

export default function RegisterScreen({ navigation }) {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [nombre, setNombre] = useState('');

  const handleRegister = async () => {
    if (!nombre || !correo || !contraseña) {
      console.log('Campos vacíos');
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    try{
      console.log('Enviando solicitud...');
      await register(nombre, correo, contraseña);
      Alert.alert('Éxito', 'Usuario registrado correctamente');
      navigation.navigate('Login');
    }catch (error){
      console.log('Error al registrar:', error.message);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Usuario</Text>
      <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
      <TextInput style={styles.input} placeholder="Correo electrónico" value={correo} onChangeText={setCorreo} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Contraseña" value={contraseña} onChangeText={setContraseña} secureTextEntry />
      <Button title="Registrarse" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 },
});
