import React from 'react';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import StartPage from './pages/StartPage';
import {NavigationContainer} from '@react-navigation/native';

const themeOptions = {
  ...DefaultTheme,
  dark: false,
  colors: {
    background: 'black',
    text: 'white',
  },
};

const Root = () => {
  return (
    <NavigationContainer>
      <PaperProvider theme={themeOptions}>
        <StartPage />
      </PaperProvider>
    </NavigationContainer>
  );
};

export default Root;
