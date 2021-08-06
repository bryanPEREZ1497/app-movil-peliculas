import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Inicio } from './componentes/Inicio';
import { Detalles } from './componentes/Detalles';

const Stack = createStackNavigator();

export default function App() {
  return (
     <NavigationContainer>
       <Stack.Navigator>
         <Stack.Screen
           name="Inicio"
           component={Inicio}
           options={{ headerShown: false }}
         />
         <Stack.Screen
           name="Detalles"
           component={Detalles}
           options={({ route }) => ({
             title: route.params.movie.Title,
           })}
         />
       </Stack.Navigator>
     </NavigationContainer>
  );
}

