import {SearchDto} from './../dtos/search/search.dto';
import {Connectivity} from './../enum/connectivity-error.enum';
import NetInfo from '@react-native-community/netinfo';
import {ProductModel} from './../models/product.model';
import * as authService from './auth.service';
import {server} from '../utils/axios.util';
import {AuthError} from '../enum/auth-error.enum';

/**
 * Method to search for products.
 * @param searchDto DTO for searching for products.
 * @returns ProductModel[] products array
 */
export const searchForProducts = async (
  searchDto: SearchDto,
): Promise<ProductModel[]> => {
  const connection = await NetInfo.fetch();

  if (!connection.isConnected) {
    console.log('Not connected to the internet');
    throw new Error(Connectivity.OFFLINE);
  }

  try {
    // Get Firebase Token
    const firebaseToken = await authService.currentUser().getIdToken();

    // Prepare request headers.
    const headers = {
      'content-type': 'application/json',
      authorization: `Bearer ${firebaseToken}`,
    };

    let categoriesSearchString = '';

    searchDto.categories.forEach((category) => {
      categoriesSearchString += `&categories=${category}`;
    });

    // Send request to the server.
    const response = await server.get(
      `v1/search?query=${searchDto.query}&sortBy=${searchDto.sortBy}${categoriesSearchString}`,
      {
        headers,
      },
    );

    // Get response data from request.
    const responseJson = response.data;

    // Convert response data to products array.
    const products: ProductModel[] = responseJson.map((productJson) => {
      const product = new ProductModel();
      product.fromJson(productJson);

      return product;
    });

    // Return products.
    return products;
  } catch (error: unknown) {
    console.log(error);
    throw new Error(AuthError.INTERNAL_SERVER_ERROR);
  }
};
