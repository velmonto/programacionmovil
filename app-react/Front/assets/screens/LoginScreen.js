import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { login } from '../services/authService';

export default function LoginScreen({ navigation }) {
  const [correo, setEmail] = useState('');
  const [contraseña, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!correo.trim() || !contraseña.trim()) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    setLoading(true);
    try {
      await login(correo, contraseña);
      navigation.replace('Dashboard');
    } catch (error) {
      Alert.alert('Error', error.message || 'Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={correo}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={contraseña}
        onChangeText={setPassword}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Entrar" onPress={handleLogin} />
      )}

      <Text 
        style={styles.link} 
        onPress={() => navigation.navigate('Register')}
      >
        Crear nueva cuenta
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 },
  link: { marginTop: 20, textAlign: 'center', color: 'blue' },
});
