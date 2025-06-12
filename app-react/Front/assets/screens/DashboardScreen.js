import React, { useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DashboardScreen({ navigation }) {
  // 🔐 Verifica si el token existe al entrar
  useEffect(() => {
    const verificarSesion = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.replace('Login');
      }
    };
    verificarSesion();
  }, []);

  // 🚪 Función de logout
  const handleLogout = async () => {
    Alert.alert('Cerrar sesión', '¿Estás seguro que deseas salir?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Cerrar sesión',
        onPress: async () => {
          try {
            await AsyncStorage.removeItem('token');
            navigation.replace('Login');
          } catch (error) {
            Alert.alert('Error', 'No se pudo cerrar sesión');
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido al Dashboard</Text>
      <Button
        title="➕ Registrar movimiento"
        onPress={() => navigation.navigate('Registro')}
      />
      <View style={{ marginVertical: 10 }} />
      <Button
        title="🧾 Ver historial de movimientos"
        onPress={() => navigation.navigate('Movimientos')}
      />

      <View style={{ marginVertical: 10 }} />

      <Button
        title="📂 Gestionar categorías"
        onPress={() => navigation.navigate('Categorías')}
      />

      <View style={{ marginVertical: 20 }} />

      <Button
        title="🔓 Cerrar sesión"
        color="red"
        onPress={handleLogout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
});
