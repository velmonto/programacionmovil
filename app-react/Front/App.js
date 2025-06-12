import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './assets/screens/LoginScreen';
import RegisterScreen from './assets/screens/RegisterScreen';
import DashboardScreen from './assets/screens/DashboardScreen';
import RegistroScreen from './assets/screens/RegistroScreen';
import CategoriasScreen from './assets/screens/CategoriasScreen';
import AnalisisScreen from './assets/screens/AnalisisScreen';
import MovimientosScreen from './assets/screens/MovimientosScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Registro" component={RegistroScreen} />
        <Stack.Screen name="Categorías" component={CategoriasScreen} />
        <Stack.Screen name="Análisis" component={AnalisisScreen} />
        <Stack.Screen name="Movimientos" component={MovimientosScreen} />
      </Stack.Navigator>
    </NavigationContainer>



  );
}
























































