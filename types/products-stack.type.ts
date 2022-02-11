import {Review} from './../models/review';
export type ProductsStackParamList = {
  ProductsOverview: undefined;
  Product: {
    id: number;
  };
  Cart: undefined;
  Reviews: {
    id: string;
    isEdit: boolean;
    review: Review;
    starsGiven: number;
    text: string;
    imageLinks: string[];
  };
  MyReviews: undefined;
};
