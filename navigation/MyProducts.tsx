import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyProductsOverviewPage from '../pages/myproducts/MyProductsOverview';
import ProductFormPage from '../pages/myproducts/ProductForm';
import routes from '../constants/routes';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-paper';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {MyProductsStackParamsList} from '../types/my-products-stack.type';
import {MyProductsNavigatorType} from '../types/my-products-navigator.type';

// My Products Stack Navigator.
const MyProductsStack = createNativeStackNavigator<MyProductsStackParamsList>();

const MyProductsNavigator: React.FC = () => {
  // Navigation hook
  const navigation = useNavigation<MyProductsNavigatorType>();

  return (
    <MyProductsStack.Navigator initialRouteName={'MyProductsOverview'}>
      <MyProductsStack.Screen
        name={'MyProductsOverview'}
        options={{
          headerShown: false,
        }}
        component={MyProductsOverviewPage}
      />
      <MyProductsStack.Screen
        name={'ProductForm'}
        component={ProductFormPage}
        options={{
          headerShown: false,
        }}
      />
    </MyProductsStack.Navigator>
  );
};

export default MyProductsNavigator;
