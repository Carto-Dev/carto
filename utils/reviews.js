import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {Reviews} from '../models/reviews';
import {Review} from '../models/review';
import uuid from 'uuid-random';

const firestoreDb = firestore();
const firebaseAuth = auth();
const reviewsDb = firestoreDb.collection('reviews');
const reviewsByUsersDb = firestoreDb.collection('reviewsByUsers');
const productsDb = firestoreDb.collection('products');

export const createEmptyReviews = async (productId) => {
  const reviewObject = new Reviews();

  reviewsDb.doc(productId).set(reviewObject);
};

export const deleteAllReviews = async (productId) => {
  await reviewsDb.doc(productId).delete();
};

export const getReviewData = (id) => reviewsDb.doc(id);

export const submitReview = async (id, stars, review, images) => {
  const reviewFireDoc = reviewsDb.doc(id).get();
  const reviewData = await (await reviewFireDoc).data();
  const user = firebaseAuth.currentUser;
  const reviewId = uuid();

  const firebaseImages = await Promise.all(
    images.map(async (imageLink) => await uploadImage(imageLink)),
  );

  const reviewObject = new Review(
    reviewId,
    user.uid,
    user.displayName,
    false,
    review,
    stars,
    firebaseImages,
  );

  reviewData.reviewBreakdown[`${stars}`] += 1;
  reviewData.reviews.push(reviewObject);
  reviewData.noOfReviews += 1;
  reviewData.totalStars += stars;

  await reviewsDb.doc(id).set(reviewData);
  await submitReviewByUser(reviewObject, id);
};

export const updateReview = async (
  newText,
  newStars,
  review,
  productId,
  images,
) => {
  const reviewFireDoc = reviewsDb.doc(productId).get();
  const reviewData = await (await reviewFireDoc).data();

  const requiredReview = reviewData.reviews.find((r) => review.id === r.id);

  const firebaseImages = await Promise.all(
    images.map(async (imageLink) =>
      !imageLink.startsWith('https://')
        ? await uploadImage(imageLink)
        : imageLink,
    ),
  );

  reviewData.totalStars -= review.stars;
  reviewData.reviewBreakdown[`${review.stars}`] -= 1;
  reviewData.reviewBreakdown[`${newStars}`] += 1;

  requiredReview.review = newText;
  requiredReview.images = firebaseImages;
  requiredReview.stars = newStars;
  reviewData.totalStars += newStars;

  await reviewsDb.doc(productId).set(reviewData);
  await updateReviewByUser(newText, newStars, review, firebaseImages);
};

export const deleteReview = async (review, productId) => {
  const reviewFireDoc = reviewsDb.doc(productId).get();
  const reviewData = await (await reviewFireDoc).data();

  const filteredReviews = reviewData.reviews.filter((r) => review.id !== r.id);

  reviewData.noOfReviews -= 1;
  reviewData.totalStars -= review.stars;
  reviewData.reviewBreakdown[`${review.stars}`] -= 1;
  reviewData.reviews = filteredReviews;

  await reviewsDb.doc(productId).set(reviewData);
  await deleteReviewByUser(review.id);
};

const uploadImage = async (localImgLink) => {
  const uuid_ = uuid();
  const path = `reviews/${uuid_}`;

  await storage().ref(path).putFile(localImgLink);
  const imgLink = await storage().ref(path).getDownloadURL();

  return imgLink;
};

export const getReviewsByUser = () =>
  reviewsByUsersDb.doc(firebaseAuth.currentUser.uid);

const submitReviewByUser = async (review, productId) => {
  const userId = firebaseAuth.currentUser.uid;
  const userReviewFireDoc = await reviewsByUsersDb.doc(userId).get();

  const productFireDoc = await productsDb.doc(productId).get();
  const productData = await productFireDoc.data();

  if (userReviewFireDoc.exists) {
    const data = await userReviewFireDoc.data();
    const reviews = data.reviews;

    reviews.push({...review, productId, productData});
    await reviewsByUsersDb.doc(userId).set({reviews});
  } else {
    const reviews = [{...review, productId, productData}];
    await reviewsByUsersDb.doc(userId).set({reviews});
  }
};

const updateReviewByUser = async (newText, newStars, review, images) => {
  const userId = firebaseAuth.currentUser.uid;
  const userReviewFireDoc = await reviewsByUsersDb.doc(userId).get();

  const data = await userReviewFireDoc.data();
  const reviews = data.reviews;

  const requiredReview = reviews.find((r) => review.id === r.id);

  requiredReview.review = newText;
  requiredReview.images = images;
  requiredReview.stars = newStars;

  await reviewsByUsersDb.doc(userId).set({reviews});
};

const deleteReviewByUser = async (reviewId) => {
  const userId = firebaseAuth.currentUser.uid;
  const userReviewFireDoc = await reviewsByUsersDb.doc(userId).get();

  const data = await userReviewFireDoc.data();
  let reviews = data.reviews;

  reviews = reviews.filter((review) => review.id !== reviewId);

  await reviewsByUsersDb.doc(userId).set({reviews});
};
