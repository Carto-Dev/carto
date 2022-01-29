import React from 'react';
import {
  NavigationContainer,
  DarkTheme as NavDarkTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthPage from '../pages/authentication/Auth';
import {DarkTheme as PaperDarkTheme} from 'react-native-paper';
import routes from '../constants/routes';
import {AuthStackParamsList} from '../types/auth-stack.type';

// Auth Stack Navigator.
const AuthStack = createNativeStackNavigator<AuthStackParamsList>();

// Theme object
const DarkTheme = {
  ...NavDarkTheme,
  colors: {
    ...NavDarkTheme.colors,
    ...PaperDarkTheme.colors,
  },
};

const AuthNavigator: React.FC = () => (
  <NavigationContainer theme={DarkTheme}>
    <AuthStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Auth'}>
      <AuthStack.Screen name={'Auth'} component={AuthPage} />
    </AuthStack.Navigator>
  </NavigationContainer>
);

export default AuthNavigator;
