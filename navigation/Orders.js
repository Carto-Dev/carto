import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OrdersPage from './../pages/orders/Orders';
import routes from '../constants/routes';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-paper';
import {useNavigation, DrawerActions} from '@react-navigation/native';

// Orders Stack Navigator.
const OrdersStack = createStackNavigator();

const OrdersNavigator = () => {
  // Navigation hook
  const navigation = useNavigation();

  return (
    <OrdersStack.Navigator initialRouteName={routes.pages.orders_page}>
      <OrdersStack.Screen
        name={routes.pages.orders_page}
        component={OrdersPage}
        options={{
          headerTitle: '',
          headerLeft: () => (
            <Button
              onPress={() => {
                navigation.dispatch(DrawerActions.openDrawer());
              }}>
              <Icon size={23} name="md-menu" color="white" />
            </Button>
          ),
        }}
      />
    </OrdersStack.Navigator>
  );
};

export default OrdersNavigator;
