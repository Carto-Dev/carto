import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OrdersPage from '../pages/orders/Orders';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {OrdersStackParamsList} from '../types/orders-stack.type';
import {OrdersNavigatorType} from '../types/orders-navigator.type';

// Orders Stack Navigator.
const OrdersStack = createNativeStackNavigator<OrdersStackParamsList>();

const OrdersNavigator: React.FC = () => {
  // Navigation hook
  const navigation = useNavigation<OrdersNavigatorType>();

  return (
    <OrdersStack.Navigator initialRouteName={'OrdersPage'}>
      <OrdersStack.Screen
        name={'OrdersPage'}
        component={OrdersPage}
        options={{
          headerShown: false,
        }}
      />
    </OrdersStack.Navigator>
  );
};

export default OrdersNavigator;
