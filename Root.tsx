import React, {useEffect} from 'react';
import {
  DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
  configureFonts,
} from 'react-native-paper';
import MainNavigator from './navigation/Main';
import {initializeMMKVStorages} from './utils/mmkv.util';
import {LogBox} from 'react-native';

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

const fontConfig = {
  web: {
    regular: {
      fontFamily: 'Raleway-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Raleway-SemiBold',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Raleway-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Raleway-Thin',
      fontWeight: 'normal',
    },
  },
  ios: {
    regular: {
      fontFamily: 'Raleway-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Raleway-SemiBold',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Raleway-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Raleway-Thin',
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: 'Raleway-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Raleway-SemiBold',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Raleway-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Raleway-Thin',
      fontWeight: 'normal',
    },
  },
};

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const themeOptions = {
  ...PaperDarkTheme,
  fontConfig: fontConfig,
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
