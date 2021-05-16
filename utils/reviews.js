import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Reviews} from '../models/reviews';
import {Review} from '../models/review';
import uuid from 'uuid-random';

const firestoreDb = firestore();
const firebaseAuth = auth();
const reviewsDb = firestoreDb.collection('reviews');

export const createEmptyReviews = async (productId) => {
  const reviewObject = new Reviews();

  reviewsDb.doc(productId).set(reviewObject);
};

export const getReviewData = (id) => reviewsDb.doc(id);

export const submitReview = async (id, stars, review) => {
  const reviewFireDoc = reviewsDb.doc(id).get();
  const reviewData = await (await reviewFireDoc).data();
  const user = firebaseAuth.currentUser;
  const reviewId = uuid();

  const reviewObject = new Review(
    reviewId,
    user.uid,
    user.displayName,
    false,
    review,
    stars,
  );

  reviewData.reviewBreakdown[`${stars}`] += 1;
  reviewData.reviews.push(reviewObject);
  reviewData.noOfReviews += 1;
  reviewData.totalStars += stars;

  await reviewsDb.doc(id).set(reviewData);
};
