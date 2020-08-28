import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthPage from '../pages/Auth';

const AuthStack = createStackNavigator();

const AuthNavigator = () => (
  <NavigationContainer>
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="auth" component={AuthPage} />
    </AuthStack.Navigator>
  </NavigationContainer>
);

export default AuthNavigator;
