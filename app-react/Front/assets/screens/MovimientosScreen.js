import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Button,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getMovimientos } from '../services/movimientosService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode as atob } from 'base-64';

export default function MovimientosScreen() {
  const [movimientos, setMovimientos] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [fechaDesde, setFechaDesde] = useState(null);
  const [fechaHasta, setFechaHasta] = useState(null);
  const [mostrarDesde, setMostrarDesde] = useState(false);
  const [mostrarHasta, setMostrarHasta] = useState(false);
  const [loading, setLoading] = useState(true);
  const [usuarioId, setUsuarioId] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('token');
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUsuarioId(payload.id);

        const data = await getMovimientos(payload.id);
        setMovimientos(data);
      } catch (error) {
        console.log('Error:', error.message);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  const movimientosFiltrados = movimientos.filter((m) => {
    const fecha = new Date(m.fecha);
    const cumpleTipo = filtroTipo === 'todos' ? true : m.tipo === filtroTipo;
    const cumpleDesde = fechaDesde ? fecha >= fechaDesde : true;
    const cumpleHasta = fechaHasta ? fecha <= fechaHasta : true;
    return cumpleTipo && cumpleDesde && cumpleHasta;
  });

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.tipo}>
        {item.tipo === 'ingreso' ? '➕ Ingreso' : '➖ Egreso'}
      </Text>
      <Text style={styles.valor}>
        ${item.valor} - {item.categoria}
      </Text>
      <Text style={styles.fecha}>{new Date(item.fecha).toLocaleString()}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Cargando movimientos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Movimientos</Text>

      <Picker
        selectedValue={filtroTipo}
        onValueChange={setFiltroTipo}
        style={styles.picker}
      >
        <Picker.Item label="Todos" value="todos" />
        <Picker.Item label="Ingresos" value="ingreso" />
        <Picker.Item label="Egresos" value="egreso" />
      </Picker>

      <View style={{ marginBottom: 10 }}>
        <Button
          title={`Desde: ${
            fechaDesde ? fechaDesde.toLocaleDateString() : 'Seleccionar'
          }`}
          onPress={() => setMostrarDesde(true)}
        />
        {mostrarDesde && (
          <DateTimePicker
            value={fechaDesde || new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => {
              setMostrarDesde(false);
              if (selectedDate) setFechaDesde(selectedDate);
            }}
          />
        )}
      </View>

      <View style={{ marginBottom: 10 }}>
        <Button
          title={`Hasta: ${
            fechaHasta ? fechaHasta.toLocaleDateString() : 'Seleccionar'
          }`}
          onPress={() => setMostrarHasta(true)}
        />
        {mostrarHasta && (
          <DateTimePicker
            value={fechaHasta || new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => {
              setMostrarHasta(false);
              if (selectedDate) setFechaHasta(selectedDate);
            }}
          />
        )}
      </View>

      <FlatList
        data={movimientosFiltrados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Sin movimientos
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, marginBottom: 10 },
  picker: { marginBottom: 20 },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tipo: { fontWeight: 'bold' },
  valor: { fontSize: 16 },
  fecha: { fontSize: 12, color: '#666' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
