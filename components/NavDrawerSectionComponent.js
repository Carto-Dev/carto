import React from 'react';
import {List} from 'react-native-paper';
import routes from './../constants/routes';

const NavDrawerSectionComponent = ({navigation}) => {
  return (
    <List.Accordion
      title="Carto Navigation"
      left={(props) => <List.Icon {...props} icon="cart" />}>
      <List.Item
        title="View Products"
        onPress={() =>
          navigation.navigate(routes.navigators.products_navigator)
        }
        right={(props) => <List.Icon {...props} icon="cart-outline" />}
      />
      <List.Item
        title="View Your Products"
        onPress={() =>
          navigation.navigate(routes.navigators.my_products_navigator)
        }
        right={(props) => <List.Icon {...props} icon="account-star" />}
      />
      <List.Item
        title="View Your Orders"
        onPress={() => navigation.navigate(routes.navigators.orders_navigator)}
        right={(props) => <List.Icon {...props} icon="package" />}
      />
      <List.Item
        title="View Your Reviews"
        onPress={() => navigation.navigate(routes.pages.my_review_page)}
        right={(props) => <List.Icon {...props} icon="check-decagram" />}
      />
    </List.Accordion>
  );
};

export default NavDrawerSectionComponent;
