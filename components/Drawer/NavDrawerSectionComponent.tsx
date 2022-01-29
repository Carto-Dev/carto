import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {DrawerNavigationHelpers} from '@react-navigation/drawer/lib/typescript/src/types';
import React from 'react';
import {List} from 'react-native-paper';
import routes from '../../constants/routes';

/**
 * Navigation section of the drawer to display respective
 * pages on top of the navigation stack.
 * @param {navigation} Navigation navigation prop from the Custom Drawer
 */

type Props = {
  navigation: DrawerNavigationHelpers;
};

const NavDrawerSectionComponent: React.FC<Props> = ({navigation}) => {
  return (
    <List.Accordion
      title="Carto Navigation"
      left={(props) => <List.Icon {...props} icon="cart" />}>
      <List.Item
        title="View Products"
        onPress={() => navigation.navigate('ProductsOverview')}
        right={(props) => <List.Icon {...props} icon="cart-outline" />}
      />
      <List.Item
        title="View Your Products"
        onPress={() => navigation.navigate('MyProducts')}
        right={(props) => <List.Icon {...props} icon="account-star" />}
      />
      <List.Item
        title="View Your Cart"
        onPress={() => navigation.navigate('Cart')}
        right={(props) => <List.Icon {...props} icon="cart" />}
      />
      <List.Item
        title="View Your Orders"
        onPress={() => navigation.navigate('Orders')}
        right={(props) => <List.Icon {...props} icon="package" />}
      />
      <List.Item
        title="View Your Reviews"
        onPress={() => navigation.navigate('MyReviews')}
        right={(props) => <List.Icon {...props} icon="check-decagram" />}
      />
    </List.Accordion>
  );
};

export default NavDrawerSectionComponent;
