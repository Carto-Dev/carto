import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthPage from '../pages/authentication/Auth';
import {DarkTheme as PaperDarkTheme} from 'react-native-paper';
import routes from '../constants/routes';

const AuthStack = createStackNavigator();

const AuthNavigator = () => (
  <NavigationContainer theme={PaperDarkTheme}>
    <AuthStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={routes.pages.auth_page}>
      <AuthStack.Screen name={routes.pages.auth_page} component={AuthPage} />
    </AuthStack.Navigator>
  </NavigationContainer>
);

export default AuthNavigator;
