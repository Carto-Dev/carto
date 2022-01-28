import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyProductsOverviewPage from '../pages/myproducts/MyProductsOverview';
import ProductFormPage from '../pages/myproducts/ProductForm';
import routes from '../constants/routes';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-paper';
import {useNavigation, DrawerActions} from '@react-navigation/native';

// My Products Stack Navigator.
const MyProductsStack = createStackNavigator();

const MyProductsNavigator: React.FC = () => {
  // Navigation hook
  const navigation = useNavigation<any>();

  return (
    <MyProductsStack.Navigator initialRouteName={routes.pages.my_products_page}>
      <MyProductsStack.Screen
        name={routes.pages.my_products_page}
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
                navigation.navigate(routes.pages.product_form_page);
              }}>
              <Icon size={23} name="md-add" color="white" />
            </Button>
          ),
        }}
      />
      <MyProductsStack.Screen
        name={routes.pages.product_form_page}
        component={ProductFormPage}
        options={{
          headerTitle: '',
        }}
      />
    </MyProductsStack.Navigator>
  );
};

export default MyProductsNavigator;
