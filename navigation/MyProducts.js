import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyProductsOverviewPage from './../pages/myproducts/MyProductsOverview';
import ProductFormPage from './../pages/myproducts/ProductForm';
import NavPage from './../pages/common/Nav';
import routes from '../constants/routes';

const MyProductsStack = createStackNavigator();

const MyProductsNavigator = () => {
  return (
    <MyProductsStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={routes.pages.my_products_page}>
      <MyProductsStack.Screen
        name={routes.pages.my_products_page}
        component={MyProductsOverviewPage}
      />
      <MyProductsStack.Screen
        name={routes.pages.product_form_page}
        component={ProductFormPage}
      />
      <MyProductsStack.Screen
        name={routes.common.nav_page}
        component={NavPage}
      />
    </MyProductsStack.Navigator>
  );
};

export default MyProductsNavigator;
