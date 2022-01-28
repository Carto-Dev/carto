import React from 'react';
import {
  DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
  configureFonts,
} from 'react-native-paper';
import {GoogleSignin} from '@react-native-community/google-signin/';
import {webClientKey} from './secrets/webClientId';
import MainNavigator from './navigation/Main';

// const fontConfig = {
//   android: {
//     regular: {
//       fontFamily: 'Raleway-Regular',
//       fontWeight: 'normal',
//     },
//     medium: {
//       fontFamily: 'Raleway-SemiBold',
//       fontWeight: 'normal',
//     },
//     light: {
//       fontFamily: 'Raleway-Light',
//       fontWeight: 'normal',
//     },
//     thin: {
//       fontFamily: 'Raleway-Thin',
//       fontWeight: 'normal',
//     },
//   },
// };

const themeOptions = {
  ...PaperDarkTheme,
};

const Root: React.FC = () => {
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
