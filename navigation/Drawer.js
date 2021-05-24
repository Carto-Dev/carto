import React from 'react';
import {ScrollView} from 'react-native';
import AccountDrawerSectionComponent from '../components/AccountDrawerSection';
import HeaderDrawerSectionComponent from '../components/HeaderDrawerSection';
import NavDrawerSectionComponent from '../components/NavDrawerSectionComponent';

const DrawerComponent = ({navigation}) => {
  return (
    <ScrollView>
      <HeaderDrawerSectionComponent />
      <AccountDrawerSectionComponent />
      <NavDrawerSectionComponent navigation={navigation} />
    </ScrollView>
  );
};

export default DrawerComponent;
