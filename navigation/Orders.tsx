import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OrdersPage from '../pages/orders/Orders';
import routes from '../constants/routes';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-paper';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {OrdersStackParamsList} from '../types/orders-stack.type';
import {OrdersNavigatorType} from '../types/orders-navigator.type';

// Orders Stack Navigator.
const OrdersStack = createNativeStackNavigator<OrdersStackParamsList>();

const OrdersNavigator: React.FC = () => {
  // Navigation hook
  const navigation = useNavigation<OrdersNavigatorType>();

  return (
    <OrdersStack.Navigator initialRouteName={'Orders'}>
      <OrdersStack.Screen
        name={'Orders'}
        component={OrdersPage}
        options={{
          headerShown: false,
        }}
      />
    </OrdersStack.Navigator>
  );
};

export default OrdersNavigator;
