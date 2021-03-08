import React from 'react';
import {View} from 'react-native';
import AccountDrawerSectionComponent from '../components/AccountDrawerSection';
import HeaderDrawerSectionComponent from '../components/HeaderDrawerSection';
import NavDrawerSectionComponent from '../components/NavDrawerSectionComponent';

const DrawerComponent = ({navigation}) => {
  return (
    <View>
      <HeaderDrawerSectionComponent />
      <AccountDrawerSectionComponent />
      <NavDrawerSectionComponent navigation={navigation} />
    </View>
  );
};

export default DrawerComponent;
