import {CategoryModel} from './../models/category.model';
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
 * Method to fetch categories.
 * @returns CategoryModel[] categories array
 */
export const fetchCategories = async (): Promise<CategoryModel[]> => {
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

    // Send request to the server.
    const response = await server.get('v1/category', {
      headers,
    });

    // Get response data from request.
    const responseJson = response.data;

    // Convert response data to Categories array.
    const categories: CategoryModel[] = responseJson.map((categoryJson) => {
      const category = new CategoryModel();
      category.fromJson(categoryJson);

      return category;
    });

    // Return categories.
    return categories;
  } catch (error: unknown) {
    console.log(error);
    throw new Error(AuthError.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Method to fetch products by category.
 * @param category Category to fetch products for.
 * @returns ProductModel[] products array
 */
export const fetchProductsByCategory = async (
  category: string,
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

    // Send request to the server.
    const response = await server.get('v1/product/category', {
      params: {
        category,
      },
      headers,
    });

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

/**
 * Method to fetch products by user.
 * @param userId User ID to fetch products from.
 * @returns ProductModel[] products array
 */
export const fetchProductsByUser = async (
  userId: number,
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

    // Send request to the server.
    const response = await server.get('v1/product/user', {
      params: {
        userId,
      },
      headers,
    });

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

/**
 * Method to fetch new products.
 * @returns ProductModel[] products array
 */
export const fetchNewProducts = async (): Promise<ProductModel[]> => {
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

    // Send request to the server.
    const response = await server.get('v1/product/new', {
      headers,
    });

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

/**
 * Method to fetch product by ID.
 * @param id Product ID.
 * @returns ProductModel product.
 */
export const fetchProductById = async (id: number): Promise<ProductModel> => {
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

    // Send request to the server.
    const response = await server.get('v1/product', {
      params: {
        id,
      },
      headers,
    });

    // Get response data from request.
    const responseJson = response.data;

    // Convert response data to product.
    const product = new ProductModel();
    product.fromJson(responseJson);

    // Return product.
    return product;
  } catch (error: unknown) {
    console.log(error);
    throw new Error(AuthError.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Method fetch products by logged in user.
 * @returns ProductModel[] user products array.
 */
export const fetchProductsByLoggedInUser = async (): Promise<
  ProductModel[]
> => {
  const serverUserModel = await authService.fetchServerUserDetails();
  return await fetchProductsByUser(serverUserModel.id);
};

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
