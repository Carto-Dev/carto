import {MMKVStorageEnum} from './../enum/mmkv-storage.enum';
import MMKVStorage from 'react-native-mmkv-storage';

export let productsMMKVStorage: MMKVStorage.API;

export const initializeMMKVStorages = () => {
  productsMMKVStorage = new MMKVStorage.Loader()
    .withInstanceID(MMKVStorageEnum.Products)
    .initialize();

  console.log('MMKV Storages Loaded');
};
