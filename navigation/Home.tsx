import React from 'react';
import {
  NavigationContainer,
  DarkTheme as NavDarkTheme,
} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MyProductsNavigator from './MyProducts';
import ProductsNavigator from './Products';
import OrdersNavigator from './Orders';
import {DarkTheme as PaperDarkTheme} from 'react-native-paper';
import routes from '../constants/routes';
import DrawerComponent from './Drawer';
import {HomeDrawerParamList} from '../types/home-drawer.type';

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
  return (
    <NavigationContainer theme={DarkTheme}>
      <HomeDrawer.Navigator
        drawerContent={(props) => <DrawerComponent {...props} />}
        initialRouteName={'Products'}>
        <HomeDrawer.Screen
          name={'Products'}
          component={ProductsNavigator}
          options={{
            title: 'Products Store',
          }}
        />
        <HomeDrawer.Screen
          name={'MyProducts'}
          component={MyProductsNavigator}
          options={{title: 'My Products'}}
        />
        <HomeDrawer.Screen
          name={'Orders'}
          component={OrdersNavigator}
          options={{title: 'My Orders'}}
        />
      </HomeDrawer.Navigator>
    </NavigationContainer>
  );
};

export default HomeNavigator;
