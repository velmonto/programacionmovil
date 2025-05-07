import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AnalisisScreen() {
  const [resumen, setResumen] = useState({
    ingresos: [],
    egresos: [],
    categorias: {},
  });

  useEffect(() => {
    // Datos simulados
    const movimientos = [
      { tipo: 'ingreso', valor: 2000, categoria: 'Salario' },
      { tipo: 'egreso', valor: 500, categoria: 'Alimentación' },
      { tipo: 'ingreso', valor: 1000, categoria: 'Freelance' },
      { tipo: 'egreso', valor: 300, categoria: 'Transporte' },
      { tipo: 'egreso', valor: 200, categoria: 'Alimentación' },
    ];

    const ingresos = movimientos.filter(m => m.tipo === 'ingreso');
    const egresos = movimientos.filter(m => m.tipo === 'egreso');

    const categorias = {};
    egresos.forEach(({ valor, categoria }) => {
      categorias[categoria] = (categorias[categoria] || 0) + valor;
    });

    setResumen({ ingresos, egresos, categorias });
  }, []);

  const totalIngresos = resumen.ingresos.reduce((sum, m) => sum + m.valor, 0);
  const totalEgresos = resumen.egresos.reduce((sum, m) => sum + m.valor, 0);

  const promedioIngresos = resumen.ingresos.length ? (totalIngresos / resumen.ingresos.length).toFixed(2) : 0;
  const promedioEgresos = resumen.egresos.length ? (totalEgresos / resumen.egresos.length).toFixed(2) : 0;

  const porcentajeAhorro = totalIngresos > 0
    ? (((totalIngresos - totalEgresos) / totalIngresos) * 100).toFixed(2)
    : '0';

  const estaPositivo = totalIngresos >= totalEgresos;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Análisis Financiero</Text>
      
      <Text style={styles.info}>💰 Promedio de ingresos: ${promedioIngresos}</Text>
      <Text style={styles.info}>💸 Promedio de egresos: ${promedioEgresos}</Text>
      <Text style={styles.info}>📈 Porcentaje de ahorro: {porcentajeAhorro}%</Text>
      <Text style={[styles.info, { color: estaPositivo ? 'green' : 'red' }]}>
        🧾 Relación ingresos/egresos: {estaPositivo ? 'Positiva' : 'Negativa'}
      </Text>

      <Text style={styles.subtitle}>Gasto promedio por categoría:</Text>
      {Object.keys(resumen.categorias).length === 0 ? (
        <Text style={styles.info}>No hay datos de egresos.</Text>
      ) : (
        Object.entries(resumen.categorias).map(([cat, val]) => (
          <Text key={cat} style={styles.info}>• {cat}: ${val}</Text>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  subtitle: { fontSize: 18, marginTop: 20, marginBottom: 10 },
  info: { fontSize: 16, marginBottom: 5 },
});
