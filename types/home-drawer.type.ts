import {ProductsStackParamList} from './products-stack.type';
import {NavigatorScreenParams} from '@react-navigation/native';

export type HomeDrawerParamList = {
  Products: NavigatorScreenParams<ProductsStackParamList>;
  MyProducts: undefined;
  Orders: undefined;
};
