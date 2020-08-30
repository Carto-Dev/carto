import React from 'react';
import {
  DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
  configureFonts,
} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import authReducer from './store/reducers/auth';
import ReduxThunk from 'redux-thunk';
import {GoogleSignin} from '@react-native-community/google-signin/index';
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
  roundness: 20,
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

  const reducer = combineReducers({
    auth: authReducer,
  });

  const store = createStore(reducer, applyMiddleware(ReduxThunk));

  return (
    <PaperProvider theme={themeOptions}>
      <ReduxProvider store={store}>
        <MainNavigator />
      </ReduxProvider>
    </PaperProvider>
  );
};

export default Root;
