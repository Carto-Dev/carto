import NetInfo from '@react-native-community/netinfo';
import {AuthError} from '../enum/auth-error.enum';
import {Connectivity} from '../enum/connectivity-error.enum';
import {server} from '../utils/axios.util';
import {CreateReviewDto} from './../dtos/reviews/create-review.dto';
import * as authService from './auth.service';

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
