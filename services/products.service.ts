import {productsMMKVStorage} from './../utils/mmkv.util';
import storage from '@react-native-firebase/storage';
import uuid from 'uuid-random';
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
import {categoriesMMKVStorage} from '../utils/mmkv.util';

const firebaseStorage = storage();

/**
 * Method to fetch categories.
 * @returns CategoryModel[] categories array
 */
export const fetchCategories = async (): Promise<CategoryModel[]> => {
  const connection = await NetInfo.fetch();

  if (!connection.isConnected) {
    console.log('Not connected to the internet');
    return await fetchCategoriesFromStorage();
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

    await saveCategoriesToDevice(categories);

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
    return await fetchProductsByCategoryFromStorage(category);
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

    await saveProductsByCategoryToDevice(products, category);

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
    return await fetchProductsByUserFromStorage(userId);
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

    await saveProductsByUserToDevice(products, userId);

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

    await saveNewProductsToDevice(products);

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

/**
 * Upload the image to firebase storage.
 * @param localImgLink Local image link
 * @returns Firebase Image link
 */
export const uploadProductImage = async (
  localImgLink: string,
): Promise<string> => {
  // Generate UUID for the image and the path
  const uuid_ = uuid();
  const path = `products/${uuid_}`;

  // Upload the image to firebase storage and generate a URL.
  await firebaseStorage.ref(path).putFile(localImgLink.substring(7));
  const imgLink = await storage().ref(path).getDownloadURL();

  // Return the firebase URL
  return imgLink;
};

const saveCategoriesToDevice = async (
  categories: CategoryModel[],
): Promise<void> => {
  const rawCategories = categories.map((category) => category.toJson());
  console.log('Saving Categories to Storage');

  await categoriesMMKVStorage.setArrayAsync('categories', rawCategories);
};

const fetchCategoriesFromStorage = async (): Promise<CategoryModel[]> => {
  console.log('Fetching categories from device storage');

  const rawCategories = await categoriesMMKVStorage.getArrayAsync('categories');

  if (rawCategories) {
    return rawCategories.map((rawCategory) => {
      const category = new CategoryModel();
      category.fromJson(rawCategory);

      return category;
    });
  } else {
    return [];
  }
};

const saveProductsByCategoryToDevice = async (
  products: ProductModel[],
  category: string,
): Promise<void> => {
  const rawProducts = products.map((product) => product.toJson());
  console.log(`Saving ${category} products to Storage`);

  await productsMMKVStorage.setArrayAsync(category, rawProducts);
};

const fetchProductsByCategoryFromStorage = async (
  category: string,
): Promise<ProductModel[]> => {
  console.log(`Fetching ${category} products from device storage`);

  const rawProducts = await productsMMKVStorage.getArrayAsync(category);

  if (rawProducts) {
    return rawProducts.map((rawProduct) => {
      const product = new ProductModel();
      product.fromJson(rawProduct);

      return product;
    });
  } else {
    return [];
  }
};

const saveProductsByUserToDevice = async (
  products: ProductModel[],
  userId: number,
): Promise<void> => {
  const rawProducts = products.map((product) => product.toJson());
  console.log(`Saving ${userId} products to Storage`);

  await productsMMKVStorage.setArrayAsync(userId.toString(), rawProducts);
};

const fetchProductsByUserFromStorage = async (
  userId: number,
): Promise<ProductModel[]> => {
  console.log(`Fetching ${userId} products from device storage`);

  const rawProducts = await productsMMKVStorage.getArrayAsync(
    userId.toString(),
  );

  if (rawProducts) {
    return rawProducts.map((rawProduct) => {
      const product = new ProductModel();
      product.fromJson(rawProduct);

      return product;
    });
  } else {
    return [];
  }
};

const saveNewProductsToDevice = async (
  products: ProductModel[],
): Promise<void> => {
  const rawProducts = products.map((product) => product.toJson());
  console.log(`Saving NEW products to Storage`);

  await productsMMKVStorage.setArrayAsync('NEW', rawProducts);
};
