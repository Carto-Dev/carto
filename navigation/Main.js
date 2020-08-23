import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashPage from '../pages/Splash';
import HomePage from '../pages/Home';
import AuthPage from '../pages/Auth';
import {useDispatch} from 'react-redux';
import * as authActions from './../store/actions/auth';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const onAuthStateChanged = (user) => {
      setLoading(true);
      if (user) {
        dispatch(
          authActions.autoLogin(
            user.uid,
            user.displayName,
            user.email,
            user.photoURL,
          ),
        );
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }

      setLoading(false);
    };
    return auth().onAuthStateChanged(onAuthStateChanged);
  }, [dispatch]);

  if (isLoading) {
    return <SplashPage />;
  } else {
    if (isLoggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="start" component={HomePage} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="authentication" component={AuthPage} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  }
};

export default MainNavigator;
