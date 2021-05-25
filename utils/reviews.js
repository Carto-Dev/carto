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

/**
 * On creation of new products, create an empty reviews
 * object and save it to firebase
 * @param productId ID for the product
 */
export const createEmptyReviews = async (productId) => {
  // Create new empty reviews object
  const reviewObject = new Reviews();

  // Saving the empty review object to database.
  reviewsDb.doc(productId).set(reviewObject);
};

/**
 * On product deletion, delete all reviews for the product.
 * @param productId ID for the product
 */
export const deleteAllReviews = async (productId) => {
  // Delete the review document itself.
  await reviewsDb.doc(productId).delete();
};

/**
 * Fetch the reviews for any product.
 * @param id ID for the product.
 * @returns Snapshot object for the firebase document.
 */
export const getReviewData = (id) => reviewsDb.doc(id);

/**
 * To submit a new review for the product.
 * @param id Product ID
 * @param stars Review stars
 * @param review Actual review
 * @param images Images attached with the review
 */
export const submitReview = async (id, stars, review, images) => {
  // Fetch the reviews doc from firebase.
  const reviewFireDoc = reviewsDb.doc(id).get();
  const reviewData = await (await reviewFireDoc).data();

  // Fetch the logged in user details.
  const user = firebaseAuth.currentUser;

  // Generate a new review UUID.
  const reviewId = uuid();

  // Map the local image URIs to firebase URIs for the images.
  // Uploading the images.
  const firebaseImages = await Promise.all(
    images.map(async (imageLink) => await uploadImage(imageLink)),
  );

  //TODO: Get the orders for the user and check if they bought the product.

  // Review object to save it to firebase.
  const reviewObject = new Review(
    reviewId,
    user.uid,
    user.displayName,
    false,
    review,
    stars,
    firebaseImages,
  );

  // Update the reviews object with stars
  // and no of reviews and also review object itself.
  reviewData.reviewBreakdown[`${stars}`] += 1;
  reviewData.reviews.push(reviewObject);
  reviewData.noOfReviews += 1;
  reviewData.totalStars += stars;

  // Update the review object
  await reviewsDb.doc(id).set(reviewData);

  // Save it to the user review document.
  await submitReviewByUser(reviewObject, id);
};

/**
 * Update a specific review in the reviews object.
 * @param newText New Review text
 * @param newStars New Review stars
 * @param review The old review object
 * @param productId Product ID
 * @param images Updated array of images.
 */
export const updateReview = async (
  newText,
  newStars,
  review,
  productId,
  images,
) => {
  // Fetch the reviews doc from firebase.
  const reviewFireDoc = reviewsDb.doc(productId).get();
  const reviewData = await (await reviewFireDoc).data();

  // Get the actual review to be updated.
  const requiredReview = reviewData.reviews.find((r) => review.id === r.id);

  // Upload new images to firebase.
  const firebaseImages = await Promise.all(
    images.map(async (imageLink) =>
      !imageLink.startsWith('https://')
        ? await uploadImage(imageLink)
        : imageLink,
    ),
  );

  // Update the stars on the reviews object.
  reviewData.totalStars -= review.stars;
  reviewData.totalStars += newStars;
  reviewData.reviewBreakdown[`${review.stars}`] -= 1;
  reviewData.reviewBreakdown[`${newStars}`] += 1;

  // Update the review object as well.
  requiredReview.review = newText;
  requiredReview.images = firebaseImages;
  requiredReview.stars = newStars;

  // Save the updated reviews to firebase.
  await reviewsDb.doc(productId).set(reviewData);

  // Update the review on the user review document.
  await updateReviewByUser(newText, newStars, review, firebaseImages);
};

/**
 * Delete the review for a specific object.
 * @param review Review object to be deleted
 * @param productId Product ID
 */
export const deleteReview = async (review, productId) => {
  // Get the reviews for the product.
  const reviewFireDoc = reviewsDb.doc(productId).get();
  const reviewData = await (await reviewFireDoc).data();

  // Remove the review from the reviews object.
  const filteredReviews = reviewData.reviews.filter((r) => review.id !== r.id);

  // Remove the stars and total no of reviews.
  reviewData.noOfReviews -= 1;
  reviewData.totalStars -= review.stars;
  reviewData.reviewBreakdown[`${review.stars}`] -= 1;
  reviewData.reviews = filteredReviews;

  // Update and save it to the database.
  await reviewsDb.doc(productId).set(reviewData);

  // Delete the review on the user review document.
  await deleteReviewByUser(review.id);
};

/**
 * Upload image to the database.
 * @param  localImgLink Local Image Link
 * @returns Firebase URI for the image
 */
const uploadImage = async (localImgLink) => {
  // Generate a new UUID and set the path.
  const uuid_ = uuid();
  const path = `reviews/${uuid_}`;

  // Upload the image to the database and generate a URL.
  await storage().ref(path).putFile(localImgLink);
  const imgLink = await storage().ref(path).getDownloadURL();

  // Return the Image URL
  return imgLink;
};

/**
 * Get all reviews for the logged in user.
 * @returns Snapshot object with data for user reviews
 */
export const getReviewsByUser = () =>
  reviewsByUsersDb.doc(firebaseAuth.currentUser.uid);

/**
 * Save the review object in the user review document.
 * @param review Review object to be saved
 * @param productId ID for the product
 */
const submitReviewByUser = async (review, productId) => {
  // Get the user review document from firebase.
  const userId = firebaseAuth.currentUser.uid;
  const userReviewFireDoc = await reviewsByUsersDb.doc(userId).get();

  // Get the product data from firebase.
  const productFireDoc = await productsDb.doc(productId).get();
  const productData = await productFireDoc.data();

  // CASE 1: If the user review exists
  if (userReviewFireDoc.exists) {
    // Update the document and save it to firebase.
    const data = await userReviewFireDoc.data();
    const reviews = data.reviews;

    reviews.push({...review, productId, productData});
    await reviewsByUsersDb.doc(userId).set({reviews});
  }
  // CASE 2: If the user review does not exists
  else {
    // Create a new document with the review in it and save to firebase.
    const reviews = [{...review, productId, productData}];
    await reviewsByUsersDb.doc(userId).set({reviews});
  }
};

/**
 * Save the updated the review to the user review document.
 * @param newText Updated review text
 * @param newStars Updated review stars
 * @param review Old review object
 * @param images Updated images array
 */
const updateReviewByUser = async (newText, newStars, review, images) => {
  // Get the user review document.
  const userId = firebaseAuth.currentUser.uid;
  const userReviewFireDoc = await reviewsByUsersDb.doc(userId).get();

  // Fetch the reviews data from the document.
  const data = await userReviewFireDoc.data();
  const reviews = data.reviews;

  // Fetch the review to be updated.
  const requiredReview = reviews.find((r) => review.id === r.id);

  // Update the review and save it to firebase.
  requiredReview.review = newText;
  requiredReview.images = images;
  requiredReview.stars = newStars;

  await reviewsByUsersDb.doc(userId).set({reviews});
};

/**
 * Delete the review from the user reviews document.
 * @param reviewId Review ID
 */
const deleteReviewByUser = async (reviewId) => {
  // Fetch the user review document from firebase.
  const userId = firebaseAuth.currentUser.uid;
  const userReviewFireDoc = await reviewsByUsersDb.doc(userId).get();

  // Fetch the reviews array.
  const data = await userReviewFireDoc.data();
  let reviews = data.reviews;

  // Filter out the review to be deleted
  reviews = reviews.filter((review) => review.id !== reviewId);

  // Update the user review document.
  await reviewsByUsersDb.doc(userId).set({reviews});
};
