import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OrdersPage from './../pages/orders/Orders';
import NavPage from './../pages/common/Nav';
import routes from '../constants/routes';

const OrdersStack = createStackNavigator();

const OrdersNavigator = () => {
  return (
    <OrdersStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={routes.pages.orders_page}>
      <OrdersStack.Screen
        name={routes.pages.orders_page}
        component={OrdersPage}
      />
      <OrdersStack.Screen name={routes.common.nav_page} component={NavPage} />
    </OrdersStack.Navigator>
  );
};

export default OrdersNavigator;
