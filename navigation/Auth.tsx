import React from 'react';
import {
  NavigationContainer,
  DarkTheme as NavDarkTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthPage from '../pages/authentication/Auth';
import {DarkTheme as PaperDarkTheme} from 'react-native-paper';
import routes from '../constants/routes';

// Auth Stack Navigator.
const AuthStack = createStackNavigator();

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
      initialRouteName={routes.pages.auth_page}>
      <AuthStack.Screen name={routes.pages.auth_page} component={AuthPage} />
    </AuthStack.Navigator>
  </NavigationContainer>
);

export default AuthNavigator;
