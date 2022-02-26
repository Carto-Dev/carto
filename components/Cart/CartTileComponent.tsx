import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {IconButton, List} from 'react-native-paper';
import {CartItemModel} from '../../models/cart-item.model';
import CartFormComponent from './CartFormComponent';
import * as cartService from './../../services/cart.service';
import {UpdateCartItemDto} from '../../dtos/cart/update-cart-item.dto';
import {DeleteCartItemDto} from '../../dtos/cart/delete-cart-tem.dto';

export interface CartTileComponentProps {
  cartItem: CartItemModel;
  refreshCart: () => void;
  displaySnackbar: (message: string) => void;
}

const CartTileComponent: React.FC<CartTileComponentProps> = ({
  cartItem,
  refreshCart,
  displaySnackbar,
}) => {
  // Modal Visibility
  const [visible, setVisible] = useState(false);

  const deleteCartItem = async () => {
    Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete this product from your cart?',
      [
        {
          text: 'OKAY',
          onPress: async () => {
            await cartService.deleteCartItem(
              DeleteCartItemDto.newDto(cartItem.id),
            );
            refreshCart();
            displaySnackbar('Cart Updated');
          },
        },
        {
          text: 'CANCEL',
          onPress: () => {},
          style: 'cancel',
        },
      ],
    );
  };

  const updateCartItem = async (quantity: number) => {
    await cartService.updateCartItem(
      UpdateCartItemDto.newDto(cartItem.id, quantity),
    );

    refreshCart();
    setVisible(false);
    displaySnackbar('Cart Updated');
  };

  return (
    <React.Fragment>
      <List.Item
        title={`${
          cartItem.product.title.length > 15
            ? `${cartItem.product.title.substring(0, 15)}...`
            : cartItem.product.title
        } x${cartItem.quantity} (\$${(
          cartItem.quantity * cartItem.product.cost
        ).toFixed(2)})`}
        description={`Cost: \$${cartItem.product.cost.toFixed(2)}`}
        right={(props) => (
          <View style={styles.buttonView}>
            <IconButton icon="pencil" onPress={() => setVisible(true)} />
            <IconButton icon="trash-can" onPress={deleteCartItem} />
          </View>
        )}
      />
      <CartFormComponent
        isOpen={visible}
        onClose={() => setVisible(false)}
        quantity={cartItem.quantity}
        onSubmit={updateCartItem}
      />
    </React.Fragment>
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
