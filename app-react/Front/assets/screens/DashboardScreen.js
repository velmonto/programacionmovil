import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function DashboardScreen({ navigation }) {
  const [ingresos, setIngresos] = useState(0);
  const [egresos, setEgresos] = useState(0);

  useEffect(() => {
    // Simulación de datos (más adelante se conectará al backend)
    const datosSimulados = [
      { tipo: 'ingreso', valor: 2000 },
      { tipo: 'egreso', valor: 500 },
      { tipo: 'ingreso', valor: 1000 },
      { tipo: 'egreso', valor: 300 },
    ];

    const totalIngresos = datosSimulados
      .filter(item => item.tipo === 'ingreso')
      .reduce((sum, item) => sum + item.valor, 0);

    const totalEgresos = datosSimulados
      .filter(item => item.tipo === 'egreso')
      .reduce((sum, item) => sum + item.valor, 0);

    setIngresos(totalIngresos);
    setEgresos(totalEgresos);
  }, []);

  const saldoDisponible = ingresos - egresos;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Resumen financiero</Text>
      <Text style={styles.saldo}>Saldo disponible: ${saldoDisponible}</Text>
      <Text style={styles.ingresos}>Ingresos totales: ${ingresos}</Text>
      <Text style={styles.egresos}>Egresos totales: ${egresos}</Text>

      <View style={styles.buttonsContainer}>
        <Button title="Registrar Movimiento" onPress={() => navigation.navigate('Registro')} />
        <Button title="Categorías" onPress={() => navigation.navigate('Categorías')} />
        <Button title="Análisis" onPress={() => navigation.navigate('Análisis')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  saldo: { fontSize: 20, marginVertical: 10, color: '#000' },
  ingresos: { fontSize: 18, color: 'green', marginBottom: 5 },
  egresos: { fontSize: 18, color: 'red', marginBottom: 20 },
  buttonsContainer: { gap: 10 },
});
