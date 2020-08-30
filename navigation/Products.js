import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProductsOverviewPage from '../pages/products/ProductsOverview';
import ProductPage from '../pages/products/Product';
import CartPage from '../pages/products/Cart';
import routes from '../constants/routes';

const ProductsStack = createStackNavigator();

const ProductsNavigator = () => {
  return (
    <ProductsStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={routes.pages.products_overview_page}>
      <ProductsStack.Screen
        name={routes.pages.products_overview_page}
        component={ProductsOverviewPage}
      />
      <ProductsStack.Screen
        name="single_product_page"
        component={ProductPage}
      />
      <ProductsStack.Screen
        name={routes.pages.cart_page}
        component={CartPage}
      />
    </ProductsStack.Navigator>
  );
};

export default ProductsNavigator;
