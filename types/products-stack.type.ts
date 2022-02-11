import {ReviewImageModel} from './../models/review-image.model';
import {Review} from './../models/review';
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
    imageLinks: ReviewImageModel[];
  };
  MyReviews: undefined;
};
