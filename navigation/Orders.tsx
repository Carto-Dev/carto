import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OrdersPage from '../pages/orders/Orders';
import routes from '../constants/routes';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-paper';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {OrdersStackParamsList} from '../types/orders-stack.type';
import {OrdersNavigator} from '../types/orders-navigator.type';

// Orders Stack Navigator.
const OrdersStack = createStackNavigator<OrdersStackParamsList>();

const OrdersNavigator: React.FC = () => {
  // Navigation hook
  const navigation = useNavigation<OrdersNavigator>();

  return (
    <OrdersStack.Navigator initialRouteName={'Orders'}>
      <OrdersStack.Screen
        name={'Orders'}
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
