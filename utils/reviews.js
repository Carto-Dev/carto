import firestore from '@react-native-firebase/firestore';
import {Reviews} from '../models/reviews';

const firestoreDb = firestore();
const reviewsDb = firestoreDb.collection('reviews');

export const createEmptyReviews = async (productId) => {
  const reviewObject = new Reviews();

  reviewsDb.doc(productId).set(reviewObject);
};
