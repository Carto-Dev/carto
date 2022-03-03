import {ReviewModel} from '../models/review.model';
export type ProductsStackParamList = {
  ProductsOverview: undefined;
  Product: {
    id: number;
  };
  Cart: undefined;
  Reviews: {
    id: number;
    isEdit: boolean;
    review: ReviewModel;
    starsGiven: number;
    text: string;
    imageLinks: string[];
  };
  MyReviews: undefined;
  ProductsByCategory: {
    category: string;
  };
  Search: undefined;
};
