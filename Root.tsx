import React, {useEffect} from 'react';
import {
  DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
  configureFonts,
} from 'react-native-paper';
import MainNavigator from './navigation/Main';
import {initializeMMKVStorages} from './utils/mmkv.util';

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
  useEffect(() => {
    initializeMMKVStorages();
  }, []);

  return (
    <PaperProvider theme={themeOptions}>
      <MainNavigator />
    </PaperProvider>
  );
};

export default Root;
