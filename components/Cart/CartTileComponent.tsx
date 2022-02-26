import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {IconButton, List, Text} from 'react-native-paper';
import {CartItemModel} from '../../models/cart-item.model';

export interface CartTileComponentProps {
  cartItem: CartItemModel;
}

const CartTileComponent: React.FC<CartTileComponentProps> = ({cartItem}) => {
  return (
    <List.Item
      title={`${
        cartItem.product.title.length > 15
          ? `${cartItem.product.title.substring(0, 15)}...`
          : 'nah'
      } x${cartItem.quantity} (\$${(
        cartItem.quantity * cartItem.product.cost
      ).toFixed(2)})`}
      description={`Cost: \$${cartItem.product.cost.toFixed(2)}`}
      right={(props) => (
        <View style={styles.buttonView}>
          <IconButton icon="pencil" onPress={() => {}} />
          <IconButton icon="trash-can" onPress={() => {}} />
        </View>
      )}
    />
  );
};

export default CartTileComponent;

const styles = StyleSheet.create({
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
