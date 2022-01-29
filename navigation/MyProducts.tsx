import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyProductsOverviewPage from '../pages/myproducts/MyProductsOverview';
import ProductFormPage from '../pages/myproducts/ProductForm';
import routes from '../constants/routes';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-paper';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {MyProductsStackParamsList} from '../types/my-products-stack.type';
import {MyProductsNavigator} from '../types/my-products-navigator.type';

// My Products Stack Navigator.
const MyProductsStack = createStackNavigator<MyProductsStackParamsList>();

const MyProductsNavigator: React.FC = () => {
  // Navigation hook
  const navigation = useNavigation<MyProductsNavigator>();

  return (
    <MyProductsStack.Navigator initialRouteName={'MyProductsOverview'}>
      <MyProductsStack.Screen
        name={'MyProductsOverview'}
        component={MyProductsOverviewPage}
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
          headerRight: () => (
            <Button
              onPress={() => {
                navigation.navigate('ProductForm');
              }}>
              <Icon size={23} name="md-add" color="white" />
            </Button>
          ),
        }}
      />
      <MyProductsStack.Screen
        name={'ProductForm'}
        component={ProductFormPage}
        options={{
          headerTitle: '',
        }}
      />
    </MyProductsStack.Navigator>
  );
};

export default MyProductsNavigator;
