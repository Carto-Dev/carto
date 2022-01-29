import {HomeDrawerParamList} from './home-drawer.type';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MyProductsStackParamsList} from './my-products-stack.type';

export type MyProductsNavigator = CompositeNavigationProp<
  StackNavigationProp<MyProductsStackParamsList, 'MyProductsOverview'>,
  DrawerNavigationProp<HomeDrawerParamList>
>;
