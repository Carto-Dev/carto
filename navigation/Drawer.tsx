import {DrawerContentComponentProps} from '@react-navigation/drawer';
import React from 'react';
import {ScrollView} from 'react-native';
import AccountDrawerSectionComponent from '../components/Drawer/AccountDrawerSection';
import HeaderDrawerSectionComponent from '../components/Drawer/HeaderDrawerSection';
import NavDrawerSectionComponent from '../components/Drawer/NavDrawerSectionComponent';

type Props = DrawerContentComponentProps;

const DrawerComponent: React.FC<Props> = ({navigation}) => {
  return (
    <ScrollView>
      <HeaderDrawerSectionComponent />
      <AccountDrawerSectionComponent />
      <NavDrawerSectionComponent navigation={navigation} />
    </ScrollView>
  );
};

export default DrawerComponent;
