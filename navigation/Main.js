import React, {useEffect, useState} from 'react';
import SplashPage from '../pages/loading/Splash';
import {useDispatch} from 'react-redux';
import * as authActions from './../store/actions/auth';
import auth from '@react-native-firebase/auth';
import AuthNavigator from './Auth';
import HomeNavigator from './Home';

const MainNavigator = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const onAuthStateChanged = (user) => {
      setLoading(true);
      if (user) {
        dispatch(authActions.autoLogin(user.uid, user.displayName, user.email));
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
      return <HomeNavigator />;
    } else {
      return <AuthNavigator />;
    }
  }
};

export default MainNavigator;
