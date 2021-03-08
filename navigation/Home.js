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

const HomeDrawer = createDrawerNavigator();

const DarkTheme = {
  ...NavDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavDarkTheme.colors,
    ...PaperDarkTheme.colors,
  },
};

const HomeNavigator = () => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <HomeDrawer.Navigator
        drawerContent={(props) => <DrawerComponent {...props} />}
        initialRouteName={routes.navigators.products_navigator}>
        <HomeDrawer.Screen
          name={routes.navigators.products_navigator}
          component={ProductsNavigator}
          options={{
            title: 'Products Store',
          }}
        />
        <HomeDrawer.Screen
          name={routes.navigators.my_products_navigator}
          component={MyProductsNavigator}
          options={{title: 'My Products'}}
        />
        <HomeDrawer.Screen
          name={routes.navigators.orders_navigator}
          component={OrdersNavigator}
          options={{title: 'My Orders'}}
        />
      </HomeDrawer.Navigator>
    </NavigationContainer>
  );
};

export default HomeNavigator;
