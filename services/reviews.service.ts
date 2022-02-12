import {UserReview} from './../models/user-review.model';
import storage from '@react-native-firebase/storage';
import uuid from 'uuid-random';
import {DeleteReviewDto} from './../dtos/reviews/delete-review.dto';
import {UpdateReviewDto} from './../dtos/reviews/update-review.dto';
import NetInfo from '@react-native-community/netinfo';
import {AuthError} from '../enum/auth-error.enum';
import {Connectivity} from '../enum/connectivity-error.enum';
import {server} from '../utils/axios.util';
import {CreateReviewDto} from './../dtos/reviews/create-review.dto';
import * as authService from './auth.service';

const firebaseStorage = storage();

/**
 * Method to fetch reviews by user.
 * @returns UserReview[] user reviews array
 */
export const fetchReviewsByUser = async (): Promise<UserReview[]> => {
  const connection = await NetInfo.fetch();

  if (!connection.isConnected) {
    console.log('Not connected to the internet');
    throw new Error(Connectivity.OFFLINE);
  }

  try {
    // Get Firebase Token
    const firebaseToken = await authService.currentUser().getIdToken();

    // Prepare request headers.
    const headers = {
      'content-type': 'application/json',
      authorization: `Bearer ${firebaseToken}`,
    };

    // Send request to the server.
    const response = await server.get('v1/review', {
      headers,
    });

    // Get response data from request.
    const responseJson = response.data;

    // Convert response data to reviews array.
    const reviews: UserReview[] = responseJson.map((reviewJson) =>
      UserReview.fromJson(reviewJson),
    );

    // Return reviews.
    return reviews;
  } catch (error: unknown) {
    console.log(error);
    throw new Error(AuthError.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Method to create new reviews on server.
 * @param createReviewDto DTO For creating a new review
 */
export const createReview = async (
  createReviewDto: CreateReviewDto,
): Promise<void> => {
  const connection = await NetInfo.fetch();

  if (!connection.isConnected) {
    console.log('Not connected to the internet');
    throw new Error(Connectivity.OFFLINE);
  }

  try {
    // Prepare request body.
    const body = createReviewDto.toJson();

    // Get Firebase Token
    const firebaseToken = await authService.currentUser().getIdToken();

    // Prepare request headers.
    const headers = {
      'content-type': 'application/json',
      authorization: `Bearer ${firebaseToken}`,
    };

    // Send request to the server.
    const response = await server.post('v1/review', body, {
      headers,
    });
  } catch (error: unknown) {
    console.log(error);
    throw new Error(AuthError.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Method to update reviews on server.
 * @param updateReviewDto DTO For updating a review
 */
export const updateReview = async (
  updateReviewDto: UpdateReviewDto,
): Promise<void> => {
  const connection = await NetInfo.fetch();

  if (!connection.isConnected) {
    console.log('Not connected to the internet');
    throw new Error(Connectivity.OFFLINE);
  }

  try {
    // Prepare request body.
    const body = updateReviewDto.toJson();

    // Get Firebase Token
    const firebaseToken = await authService.currentUser().getIdToken();

    // Prepare request headers.
    const headers = {
      'content-type': 'application/json',
      authorization: `Bearer ${firebaseToken}`,
    };

    // Send request to the server.
    const response = await server.put('v1/review', body, {
      headers,
    });
  } catch (error: unknown) {
    console.log(error);
    throw new Error(AuthError.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Method to delete reviews on server.
 * @param deleteReviewDto DTO For deleting a review
 */
export const deleteReview = async (
  deleteReviewDto: DeleteReviewDto,
): Promise<void> => {
  const connection = await NetInfo.fetch();

  if (!connection.isConnected) {
    console.log('Not connected to the internet');
    throw new Error(Connectivity.OFFLINE);
  }

  try {
    // Prepare request body.
    const body = deleteReviewDto.toJson();

    // Get Firebase Token
    const firebaseToken = await authService.currentUser().getIdToken();

    // Prepare request headers.
    const headers = {
      'content-type': 'application/json',
      authorization: `Bearer ${firebaseToken}`,
    };

    // Send request to the server.
    const response = await server.delete('v1/review', {
      headers,
      data: body,
    });
  } catch (error: unknown) {
    console.log(error);
    throw new Error(AuthError.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Upload the image to firebase storage.
 * @param localImgLink Local image link
 * @returns Firebase Image link
 */
export const uploadReviewImage = async (
  localImgLink: string,
): Promise<string> => {
  // Generate UUID for the image and the path
  const uuid_ = uuid();
  const path = `reviews/${uuid_}`;

  // Upload the image to firebase storage and generate a URL.
  await firebaseStorage.ref(path).putFile(localImgLink.substring(7));
  const imgLink = await storage().ref(path).getDownloadURL();

  // Return the firebase URL
  return imgLink;
};
