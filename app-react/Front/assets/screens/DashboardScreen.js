import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSaldo } from '../services/usuariosService';
import { decode as atob } from 'base-64';

export default function DashboardScreen({ navigation }) {
  const [saldo, setSaldo] = useState(null);
  const [usuarioId, setUsuarioId] = useState(null);


  const cargarSaldo = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const payload = JSON.parse(atob(token.split('.')[1]));
      const id = payload.id;
      setUsuarioId(id);

      const data = await getSaldo(id);
      setSaldo(data);
    } catch (error) {
      console.error('Error al obtener saldo:', error.message);
    }
  };

  useEffect(() => {
    cargarSaldo();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      cargarSaldo();
    }, [])
  );

  const handleLogout = async () => {
    Alert.alert('Cerrar sesión', '¿Deseas salir?', [
      { text: 'Cancelar', style: 'cancel' },
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
      <Text style={styles.title}>Dashboard</Text>

      <Text style={styles.label}>Saldo actual:</Text>
      <Text style={styles.saldo}>
        {saldo !== null ? `$${parseFloat(saldo).toFixed(2)}` : 'Cargando...'}
      </Text>

      <View style={{ marginTop: 30 }}>
        <Button
          title="Registrar movimiento"
          onPress={() => navigation.navigate('Registro')}
        />
        <View style={{ marginVertical: 10 }} />
        <Button
          title="Ver movimientos"
          onPress={() => navigation.navigate('Movimientos')}
        />
        <View style={{ marginVertical: 10 }} />
        <Button
          title="Categorías"
          onPress={() => navigation.navigate('Categorías')}
        />
        <View style={{ marginVertical: 20 }} />
        <Button title="Cerrar sesión" color="red" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 18, marginBottom: 5 },
  saldo: { fontSize: 32, fontWeight: 'bold', color: 'green' },
});
