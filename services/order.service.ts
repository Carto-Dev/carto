import {ordersMMKVStorage} from './../utils/mmkv.util';
import {CreateOrderDto} from './../dtos/orders/create-order.dto';
import {Connectivity} from './../enum/connectivity-error.enum';
import NetInfo from '@react-native-community/netinfo';
import {OrderModel} from './../models/order. model';
import * as cartService from './cart.service';
import * as authService from './auth.service';
import {server} from '../utils/axios.util';
import {AuthError} from '../enum/auth-error.enum';
import {CreateOrderItemDto} from '../dtos/orders/create-order-item.dto';

/**
 * Method to fetch orders.
 * @returns OrderModel[] orders array
 */
export const fetchOrders = async (): Promise<OrderModel[]> => {
  const connection = await NetInfo.fetch();

  if (!connection.isConnected) {
    console.log('Not connected to the internet');
    // return await fetchCategoriesFromStorage();
  }

  try {
    // Get Firebase Token
    const firebaseToken = await authService.currentUser().getIdToken();

    // Prepare request headers.
    const headers = {
      'content-type': 'application/json',
      authorization: `Bearer ${firebaseToken}`,
    };

    // Send request to the server.
    const response = await server.get('v1/order', {
      headers,
    });

    // Get response data from request.
    const responseJson = response.data;

    // Convert response data to Orders array.
    const orders: OrderModel[] = responseJson.map((orderJson: any) =>
      OrderModel.fromJson(orderJson),
    );

    await saveOrdersToDevice(orders);

    // Return categories.
    return orders;
  } catch (error: unknown) {
    console.log(error);
    throw new Error(AuthError.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Method to create new orders on server.
 * @returns OrderModel details for new order
 */
export const createOrder = async (): Promise<OrderModel> => {
  const connection = await NetInfo.fetch();

  if (!connection.isConnected) {
    console.log('Not connected to the internet');
    throw new Error(Connectivity.OFFLINE);
  }

  try {
    // Creating orders array.
    const orders: CreateOrderItemDto[] = (
      await cartService.fetchCartItems()
    ).map((cartItem) =>
      CreateOrderItemDto.newDto(cartItem.product.id, cartItem.quantity),
    );

    // Prepare request body.
    const body = CreateOrderDto.newDto(orders).toJson();

    // Get Firebase Token
    const firebaseToken = await authService.currentUser().getIdToken();

    // Prepare request headers.
    const headers = {
      'content-type': 'application/json',
      authorization: `Bearer ${firebaseToken}`,
    };

    // Send request to the server.
    const response = await server.post('v1/order', body, {
      headers,
    });

    // Get response data from request.
    const responseJson = response.data;

    // Convert response data to Order.
    const order = OrderModel.fromJson(responseJson);

    // Return Order.
    return order;
  } catch (error: unknown) {
    console.log(error);
    throw new Error(AuthError.INTERNAL_SERVER_ERROR);
  }
};

const saveOrdersToDevice = async (orders: OrderModel[]): Promise<void> => {
  const rawOrders = orders.map((order) => order.toJson());
  console.log(`Saving orders to Storage`);

  await ordersMMKVStorage.setArrayAsync('orders', rawOrders);
};
