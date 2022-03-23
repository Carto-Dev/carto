import {UpdatePasswordDto} from './../dtos/user/update-password.dto';
import {UpdateEmailAddressDto} from './../dtos/user/update-email-address.dto';
import {UpdateUserDto} from './../dtos/user/update-user.dto';
import NetInfo from '@react-native-community/netinfo';
import * as authService from './auth.service';
import {server} from '../utils/axios.util';
import {Connectivity} from '../enum/connectivity-error.enum';
import {AuthError} from '../enum/auth-error.enum';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

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

export const updateEmailAddress = async (
  updateEmailAddressDto: UpdateEmailAddressDto,
): Promise<void> => {
  const connection = await NetInfo.fetch();

  if (!connection.isConnected) {
    console.log('Not connected to the internet');
    throw new Error(Connectivity.OFFLINE);
  }

  try {
    await reauthenticateWithCredentials(updateEmailAddressDto.password);

    const user = authService.currentUser();

    await user.updateEmail(updateEmailAddressDto.emailAddress);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      throw new Error(AuthError.ACCOUNT_ALREADY_EXISTS);
    } else if (error.code === 'auth/wrong-password') {
      throw new Error(AuthError.WRONG_PASSWORD);
    } else {
      console.log(error);
      throw new Error(AuthError.INTERNAL_SERVER_ERROR);
    }
  }
};

export const updatePassword = async (
  updatePasswordDto: UpdatePasswordDto,
): Promise<void> => {
  const connection = await NetInfo.fetch();

  if (!connection.isConnected) {
    console.log('Not connected to the internet');
    throw new Error(Connectivity.OFFLINE);
  }

  try {
    await reauthenticateWithCredentials(updatePasswordDto.oldPassword);

    const user = authService.currentUser();

    await user.updatePassword(updatePasswordDto.newPassword);
  } catch (error) {
    if (error.code === 'auth/wrong-password') {
      throw new Error(AuthError.WRONG_PASSWORD);
    } else {
      console.log(error);
      throw new Error(AuthError.INTERNAL_SERVER_ERROR);
    }
  }
};

const reauthenticateWithCredentials = async (
  password: string,
): Promise<FirebaseAuthTypes.UserCredential> => {
  try {
    const currentUser = authService.currentUser();

    const credentials = auth.EmailAuthProvider.credential(
      currentUser.email,
      password,
    );

    return await currentUser.reauthenticateWithCredential(credentials);
  } catch (error) {
    // Handle firebase errors.
    if (error.code === 'auth/user-not-found') {
      throw new Error(AuthError.USER_NOT_FOUND);
    } else if (error.code === 'auth/wrong-password') {
      throw new Error(AuthError.WRONG_PASSWORD);
    } else {
      console.log(error);
      throw new Error(AuthError.INTERNAL_SERVER_ERROR);
    }
  }
};
