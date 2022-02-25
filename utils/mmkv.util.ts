import {MMKVStorageEnum} from './../enum/mmkv-storage.enum';
import MMKVStorage from 'react-native-mmkv-storage';

export let productsMMKVStorage: MMKVStorage.API;
export let categoriesMMKVStorage: MMKVStorage.API;
export let singleProductMMKVStorage: MMKVStorage.API;
export let reviewsMMKVStorage: MMKVStorage.API;
export let cartMMKVStorage: MMKVStorage.API;

export const initializeMMKVStorages = () => {
  productsMMKVStorage = new MMKVStorage.Loader()
    .withInstanceID(MMKVStorageEnum.Products)
    .initialize();

  categoriesMMKVStorage = new MMKVStorage.Loader()
    .withInstanceID(MMKVStorageEnum.Categories)
    .initialize();

  singleProductMMKVStorage = new MMKVStorage.Loader()
    .withInstanceID(MMKVStorageEnum.SingleProduct)
    .initialize();

  reviewsMMKVStorage = new MMKVStorage.Loader()
    .withInstanceID(MMKVStorageEnum.Reviews)
    .initialize();

  cartMMKVStorage = new MMKVStorage.Loader()
    .withInstanceID(MMKVStorageEnum.Cart)
    .initialize();

  console.log('MMKV Storages Loaded');
};
