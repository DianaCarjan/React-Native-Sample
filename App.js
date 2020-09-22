import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import Test from './src/components/Test';

const Stack = createStackNavigator();

  function RootStack() {
    return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ gestureEnabled: false, headerShown: false }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Profile' }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
        />
      </Stack.Navigator>
    );
  }

const  App = () => {
  return (
      
     <NavigationContainer>
       <RootStack/>
     </NavigationContainer>
  );
}

export default () => {
  return <App/>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: 300,
    textAlign: 'center',
    paddingVertical: 10
  }
});
