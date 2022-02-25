import {DeleteCartItemDto} from './../dtos/cart/delete-cart-tem.dto';
import {UpdateCartItemDto} from './../dtos/cart/update-cart-item.dto';
import {CartItemModel} from '../models/cart-item.model';
import {cartMMKVStorage} from '../utils/mmkv.util';

export const fetchCartItems = async (): Promise<CartItemModel[]> => {
  console.log(`Fetching CART PRODUCTS from device storage`);

  const rawCartItems = await cartMMKVStorage.getArrayAsync('cart');

  if (rawCartItems) {
    return rawCartItems.map((rawCartItem) => {
      return CartItemModel.fromJson(rawCartItem);
    });
  } else {
    return [];
  }
};

export const createNewCartItem = async (
  cartItemModel: CartItemModel,
): Promise<void> => {
  console.log(`Saving new CART PRODUCT to device storage`);

  const deviceCartItems = await fetchCartItems();
  const updatedCartItems = deviceCartItems
    .map((cartItem) => {
      if (cartItem.product.id !== cartItemModel.product.id) {
        return cartItem;
      } else {
        return cartItemModel;
      }
    })
    .map((cartItem) => cartItem.toJson());

  await cartMMKVStorage.setArrayAsync('cart', updatedCartItems);
};

export const updateCartItem = async (
  updateCartItemDto: UpdateCartItemDto,
): Promise<void> => {
  console.log(`Updating CART PRODUCT in device storage`);

  const deviceCartItems = await fetchCartItems();
  const updatedCartItems = deviceCartItems
    .map((cartItem) => {
      if (cartItem.id !== updateCartItemDto.id) {
        return cartItem;
      } else {
        cartItem.quantity = updateCartItemDto.quantity;
        return cartItem;
      }
    })
    .map((cartItem) => cartItem.toJson());

  await cartMMKVStorage.setArrayAsync('cart', updatedCartItems);
};

export const deleteCartItem = async (
  deleteCartItemDto: DeleteCartItemDto,
): Promise<void> => {
  console.log(`Deleting CART PRODUCT from device storage`);

  const deviceCartItems = await fetchCartItems();
  const updatedCartItems = deviceCartItems
    .filter((cartItem) => cartItem.id !== deleteCartItemDto.id)
    .map((cartItem) => cartItem.toJson());

  await cartMMKVStorage.setArrayAsync('cart', updatedCartItems);
};
