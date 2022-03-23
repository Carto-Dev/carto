import {UserStackParamsList} from './user-stack.type';
import {OrdersStackParamsList} from './orders-stack.type';
import {MyProductsStackParamsList} from './my-products-stack.type';
import {ProductsStackParamList} from './products-stack.type';
import {NavigatorScreenParams} from '@react-navigation/native';

export type HomeDrawerParamList = {
  Products: NavigatorScreenParams<ProductsStackParamList>;
  MyProducts: NavigatorScreenParams<MyProductsStackParamsList>;
  Orders: NavigatorScreenParams<OrdersStackParamsList>;
  UserSettings: NavigatorScreenParams<UserStackParamsList>;
};
