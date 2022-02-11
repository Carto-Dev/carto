import {ProductModel} from './../models/product.model';
export type MyProductsStackParamsList = {
  MyProductsOverview: undefined;
  ProductForm: {
    product: ProductModel;
    edit: boolean;
  };
};
