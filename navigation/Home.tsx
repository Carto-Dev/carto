import React from 'react';
import {
  NavigationContainer,
  DarkTheme as NavDarkTheme,
  useNavigation,
  DrawerActions,
} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MyProductsNavigator from './MyProducts';
import ProductsNavigator from './Products';
import OrdersNavigator from './Orders';
import {Button, DarkTheme as PaperDarkTheme} from 'react-native-paper';
import DrawerComponent from './Drawer';
import {HomeDrawerParamList} from '../types/home-drawer.type';
import {HomeNavigatorType} from '../types/home-navigator.type';
import Icon from 'react-native-vector-icons/Ionicons';

// Drawer Navigation
const HomeDrawer = createDrawerNavigator<HomeDrawerParamList>();

// Theme object
const DarkTheme = {
  ...NavDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavDarkTheme.colors,
    ...PaperDarkTheme.colors,
  },
};

const HomeNavigator: React.FC = () => {
  const navigation = useNavigation<HomeNavigatorType>();

  return (
    // <NavigationContainer theme={DarkTheme}>
    <HomeDrawer.Navigator
      drawerContent={(props) => <DrawerComponent {...props} />}
      initialRouteName={'Products'}>
      <HomeDrawer.Screen
        name={'Products'}
        component={ProductsNavigator}
        options={{
          title: '',
          headerLeft: () => (
            <Button
              onPress={() => {
                navigation.dispatch(DrawerActions.openDrawer());
              }}>
              <Icon size={23} name="md-menu" color="white" />
            </Button>
          ),
          headerRight: () => (
            <Button
              onPress={() => {
                navigation.navigate('Products', {
                  screen: 'Cart',
                });
              }}>
              <Icon size={23} name="cart" color="white" />
            </Button>
          ),
        }}
      />
      <HomeDrawer.Screen
        name={'MyProducts'}
        component={MyProductsNavigator}
        options={{
          title: 'Your Products',
          headerLeft: () => (
            <Button
              onPress={() => {
                navigation.dispatch(DrawerActions.openDrawer());
              }}>
              <Icon size={23} name="md-menu" color="white" />
            </Button>
          ),
          headerRight: () => (
            <Button
              onPress={() => {
                navigation.navigate('MyProducts', {
                  screen: 'ProductForm',
                });
              }}>
              <Icon size={23} name="md-add" color="white" />
            </Button>
          ),
        }}
      />
      <HomeDrawer.Screen
        name={'Orders'}
        component={OrdersNavigator}
        options={{
          title: 'Your Orders',
          headerLeft: () => (
            <Button
              onPress={() => {
                navigation.dispatch(DrawerActions.openDrawer());
              }}>
              <Icon size={23} name="md-menu" color="white" />
            </Button>
          ),
          headerRight: () => (
            <Button
              onPress={() => {
                navigation.navigate('Products', {
                  screen: 'Cart',
                });
              }}>
              <Icon size={23} name="cart" color="white" />
            </Button>
          ),
        }}
      />
    </HomeDrawer.Navigator>
    // </NavigationContainer>
  );
};

export default HomeNavigator;
