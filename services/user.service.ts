import {UpdateUserDto} from './../dtos/user/update-user.dto';
import NetInfo from '@react-native-community/netinfo';
import * as authService from './auth.service';
import {server} from '../utils/axios.util';
import {Connectivity} from '../enum/connectivity-error.enum';
import {AuthError} from '../enum/auth-error.enum';

/**
 * Method to update user details on server.
 * @param updateUserDto DTO For updating user details
 */
export const updateUser = async (
  updateUserDto: UpdateUserDto,
): Promise<void> => {
  const connection = await NetInfo.fetch();

  if (!connection.isConnected) {
    console.log('Not connected to the internet');
    throw new Error(Connectivity.OFFLINE);
  }

  try {
    // Prepare request body.
    const body = updateUserDto.toJson();

    // Get Firebase Token
    const firebaseToken = await authService.currentUser().getIdToken();

    // Prepare request headers.
    const headers = {
      'content-type': 'application/json',
      authorization: `Bearer ${firebaseToken}`,
    };

    // Send request to the server.
    const response = await server.put('v1/user', body, {
      headers,
    });
  } catch (error: unknown) {
    console.log(error);
    throw new Error(AuthError.INTERNAL_SERVER_ERROR);
  }
};
