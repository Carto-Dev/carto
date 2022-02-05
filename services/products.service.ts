import {UpdateProductDto} from './../dtos/products/update-product.dto';
import NetInfo from '@react-native-community/netinfo';
import {ProductModel} from './../models/product.model';
import {CreateProductDto} from './../dtos/products/create-product.dto';
import * as authService from './auth.service';
import {Connectivity} from '../enum/connectivity-error.enum';
import {server} from '../utils/axios.util';
import {AuthError} from '../enum/auth-error.enum';
import {DeleteProductDto} from '../dtos/products/delete-product.dto';

/**
 * Method to create new products on server.
 * @param createProductDto DTO For creating a new product
 * @returns ProductModel details for new product
 */
export const createProduct = async (
  createProductDto: CreateProductDto,
): Promise<ProductModel> => {
  const connection = await NetInfo.fetch();

  if (!connection.isConnected) {
    console.log('Not connected to the internet');
    throw new Error(Connectivity.OFFLINE);
  }

  try {
    // Prepare request body.
    const body = createProductDto.toJson();

    // Get Firebase Token
    const firebaseToken = await authService.currentUser().getIdToken();

    // Prepare request headers.
    const headers = {
      'content-type': 'application/json',
      authorization: `Bearer ${firebaseToken}`,
    };

    // Send request to the server.
    const response = await server.post('v1/product', body, {
      headers,
    });

    // Get response data from request.
    const responseJson = response.data;

    // Convert response data to Product.
    const product = new ProductModel();
    product.fromJson(responseJson);

    // Return Product.
    return product;
  } catch (error: unknown) {
    console.log(error);
    throw new Error(AuthError.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Method to update products on server.
 * @param updateProductDto DTO For updating a product
 * @returns ProductModel details for updated product
 */
export const updateProduct = async (
  updateProductDto: UpdateProductDto,
): Promise<ProductModel> => {
  const connection = await NetInfo.fetch();

  if (!connection.isConnected) {
    console.log('Not connected to the internet');
    throw new Error(Connectivity.OFFLINE);
  }

  try {
    // Prepare request body.
    const body = updateProductDto.toJson();

    // Get Firebase Token
    const firebaseToken = await authService.currentUser().getIdToken();

    // Prepare request headers.
    const headers = {
      'content-type': 'application/json',
      authorization: `Bearer ${firebaseToken}`,
    };

    // Send request to the server.
    const response = await server.put('v1/product', body, {
      headers,
    });

    // Get response data from request.
    const responseJson = response.data;

    // Convert response data to Product.
    const product = new ProductModel();
    product.fromJson(responseJson);

    // Return Product.
    return product;
  } catch (error: unknown) {
    console.log(error);
    throw new Error(AuthError.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Method to delete products from server.
 * @param updateProductDto DTO For deleting a product
 */
export const deleteProduct = async (
  deleteProductDto: DeleteProductDto,
): Promise<void> => {
  const connection = await NetInfo.fetch();

  if (!connection.isConnected) {
    console.log('Not connected to the internet');
    throw new Error(Connectivity.OFFLINE);
  }

  try {
    // Prepare request body.
    const body = deleteProductDto.toJson();

    // Get Firebase Token
    const firebaseToken = await authService.currentUser().getIdToken();

    // Prepare request headers.
    const headers = {
      'content-type': 'application/json',
      authorization: `Bearer ${firebaseToken}`,
    };

    // Send request to the server.
    await server.delete('v1/product', {
      headers,
      data: body,
    });
  } catch (error: unknown) {
    console.log(error);
    throw new Error(AuthError.INTERNAL_SERVER_ERROR);
  }
};
