import {HomeDrawerParamList} from './home-drawer.type';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {StackNavigationProp} from '@react-navigation/stack';
import {CompositeNavigationProp} from '@react-navigation/native';
import {OrdersStackParamsList} from './orders-stack.type';

export type OrdersNavigator = CompositeNavigationProp<
  StackNavigationProp<OrdersStackParamsList, 'Orders'>,
  DrawerNavigationProp<HomeDrawerParamList>
>;
