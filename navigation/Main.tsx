import React, {useEffect, useState} from 'react';
import SplashPage from '../pages/loading/Splash';
import auth from '@react-native-firebase/auth';
import AuthNavigator from './Auth';
import HomeNavigator from './Home';
import {
  NavigationContainer,
  DarkTheme as NavDarkTheme,
} from '@react-navigation/native';
import {DarkTheme as PaperDarkTheme} from 'react-native-paper';

// Theme object
const DarkTheme = {
  ...NavDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavDarkTheme.colors,
    ...PaperDarkTheme.colors,
  },
};

const MainNavigator: React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);

  /**
   * Listening to auth state changes and
   * loading the proper navigator to display the user
   */
  useEffect(() => {
    const onAuthStateChanged = (user) => {
      setLoading(true);
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setLoading(false);
    };
    return auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  if (isLoading) {
    return <SplashPage />;
  } else {
    if (isLoggedIn) {
      return (
        <NavigationContainer theme={DarkTheme}>
          <HomeNavigator />
        </NavigationContainer>
      );
    } else {
      return <AuthNavigator />;
    }
  }
};

export default MainNavigator;
