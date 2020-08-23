import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import authReducer from './store/reducers/auth';
import ReduxThunk from 'redux-thunk';
import {GoogleSignin} from '@react-native-community/google-signin/index';
import {webClientKey} from './secrets/webClientId';
import MainNavigator from './navigation/Main';

const themeOptions = {
  ...DefaultTheme,
  // dark: false,
  // colors: {
  //   background: 'black',
  //   text: 'white',
  // },
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
