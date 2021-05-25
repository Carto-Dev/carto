import React from 'react';
import {
  DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
  configureFonts,
} from 'react-native-paper';
import {GoogleSignin} from '@react-native-community/google-signin/';
import {webClientKey} from './secrets/webClientId';
import MainNavigator from './navigation/Main';

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'Raleway-Regular',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'Raleway-SemiBold',
      fontWeight: '600',
    },
    light: {
      fontFamily: 'Raleway-Light',
      fontWeight: '300',
    },
    thin: {
      fontFamily: 'Raleway-Thin',
      fontWeight: '100',
    },
  },
};

const themeOptions = {
  ...PaperDarkTheme,
  fonts: configureFonts(fontConfig),
};

const Root = () => {
  React.useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'],
      webClientId: webClientKey,
      offlineAccess: true,
    });
  }, []);

  return (
    <PaperProvider theme={themeOptions}>
      <MainNavigator />
    </PaperProvider>
  );
};

export default Root;
