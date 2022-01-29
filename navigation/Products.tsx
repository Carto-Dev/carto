import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import ProductsOverviewPage from '../pages/products/ProductsOverview';
import ProductPage from '../pages/products/Product';
import CartPage from '../pages/products/Cart';
import {Button} from 'react-native-paper';
import ReviewPage from '../pages/products/Review';
import MyReviewsPage from '../pages/products/MyReview';
import {ProductsStackParamList} from '../types/products-stack.type';
import {Review} from '../models/review';

// Products Stack Navigator.
const ProductsStack = createNativeStackNavigator<ProductsStackParamList>();

const ProductsNavigator: React.FC = () => {
  // Navigation Hook.
  const navigation = useNavigation<any>();

  return (
    <ProductsStack.Navigator initialRouteName={'ProductsOverview'}>
      <ProductsStack.Screen
        name={'ProductsOverview'}
        component={ProductsOverviewPage}
        options={{
          headerShown: false,
        }}
      />
      <ProductsStack.Screen
        name="Product"
        initialParams={{
          id: '',
        }}
        options={{
          headerShown: false,
        }}
        component={ProductPage}
      />
      <ProductsStack.Screen
        name={'Cart'}
        options={{
          headerShown: false,
        }}
        component={CartPage}
      />
      <ProductsStack.Screen
        name={'Reviews'}
        initialParams={{
          id: '',
          imageLinks: [],
          isEdit: false,
          review: new Review('', '', '', '', false, 1, []),
          starsGiven: 1,
          text: '',
        }}
        options={{
          headerShown: false,
        }}
        component={ReviewPage}
      />
      <ProductsStack.Screen
        name={'MyReviews'}
        options={{
          headerShown: false,
          headerTitle: 'Your Reviews',
        }}
        component={MyReviewsPage}
      />
    </ProductsStack.Navigator>
  );
};

export default ProductsNavigator;
