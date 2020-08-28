import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomePage from './../pages/Home';

const HomeStack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <NavigationContainer>
      <HomeStack.Navigator screenOptions={{headerShown: false}}>
        <HomeStack.Screen name="Home" component={HomePage} />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

export default HomeNavigator;
