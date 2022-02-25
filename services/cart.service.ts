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
