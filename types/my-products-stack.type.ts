export type MyProductsStackParamsList = {
  MyProductsOverview: undefined;
  ProductForm: {
    id: string;
    title: string;
    description: string;
    cost: number;
    categories: string[];
    imageUris: string[];
    edit: boolean;
  };
};
