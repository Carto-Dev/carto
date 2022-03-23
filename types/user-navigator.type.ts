import {HomeDrawerParamList} from './home-drawer.type';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {StackNavigationProp} from '@react-navigation/stack';
import {CompositeNavigationProp} from '@react-navigation/native';
import {UserStackParamsList} from './user-stack.type';

export type UserNavigatorType = CompositeNavigationProp<
  StackNavigationProp<UserStackParamsList, 'UserSettings'>,
  DrawerNavigationProp<HomeDrawerParamList>
>;
