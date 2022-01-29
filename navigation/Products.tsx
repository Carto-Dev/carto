import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import ProductsOverviewPage from '../pages/products/ProductsOverview';
import ProductPage from '../pages/products/Product';
import CartPage from '../pages/products/Cart';
import routes from '../constants/routes';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-paper';
import ReviewPage from '../pages/products/Review';
import MyReviewsPage from '../pages/products/MyReview';
import {ProductsStackParamList} from '../types/products-stack.type';
import {Review} from '../models/review';

// Products Stack Navigator.
const ProductsStack = createStackNavigator<ProductsStackParamList>();

const ProductsNavigator: React.FC = () => {
  // Navigation Hook.
  const navigation = useNavigation<any>();

  return (
    <ProductsStack.Navigator initialRouteName={'ProductsOverview'}>
      <ProductsStack.Screen
        name={'ProductsOverview'}
        component={ProductsOverviewPage}
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
                navigation.navigate(routes.pages.cart_page);
              }}>
              <Icon size={23} name="cart" color="white" />
            </Button>
          ),
        }}
      />
      <ProductsStack.Screen
        name="Product"
        initialParams={{
          id: '',
        }}
        options={{
          headerTitle: '',
        }}
        component={ProductPage}
      />
      <ProductsStack.Screen
        name={'Cart'}
        options={{
          headerTitle: '',
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
          headerTitle: '',
        }}
        component={ReviewPage}
      />
      <ProductsStack.Screen
        name={'MyReviews'}
        options={{
          headerTitle: '',
        }}
        component={MyReviewsPage}
      />
    </ProductsStack.Navigator>
  );
};

export default ProductsNavigator;
