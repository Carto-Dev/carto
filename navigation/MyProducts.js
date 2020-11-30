import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyProductsOverviewPage from './../pages/myproducts/MyProductsOverview';
import AddProductFormPage from './../pages/myproducts/AddProductForm';
import routes from '../constants/routes';
import EditProductFormPage from '../pages/myproducts/EditProductForm';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button, useTheme} from 'react-native-paper';
import {useNavigation, DrawerActions} from '@react-navigation/native';

const MyProductsStack = createStackNavigator();

const MyProductsNavigator = () => {
  const navigation = useNavigation();
  const paperTheme = useTheme();
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
                navigation.navigate(routes.pages.add_product_form_page);
              }}>
              <Icon size={23} name="md-add" color="white" />
            </Button>
          ),
        }}
      />
      <MyProductsStack.Screen
        name={routes.pages.add_product_form_page}
        component={AddProductFormPage}
        options={{
          headerTitle: '',
        }}
      />
      <MyProductsStack.Screen
        name={routes.pages.edit_product_form_page}
        component={EditProductFormPage}
        options={{
          headerTitle: '',
        }}
      />
    </MyProductsStack.Navigator>
  );
};

export default MyProductsNavigator;
