import {LoginUserDto} from './../dtos/auth/login-user.dto';
import {AuthError} from './../enum/auth-error.enum';
import {ServerUserModel} from './../models/server-user.model';
import {server} from './../utils/axios.util';
import {CreateUserDto} from './../dtos/auth/create-user.dto';
import axios from 'axios';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

const firebaseAuth = auth();

/**
 * Method to create new user on server and firebase.
 * @param createUserDto DTO For creating a new user
 * @returns ServerUserModel details for server user.
 */
export const registerWithEmailAddressAndPassword = async (
  createUserDto: CreateUserDto,
): Promise<ServerUserModel> => {
  try {
    // Prepare request body.
    const body = createUserDto.toJson();

    // Prepare request headers.
    const headers = {
      'content-type': 'application/json',
    };

    // Send request to the server.
    const response = await server.post('v1/auth/register', body, {
      headers,
    });

    // Get response data from request.
    const responseJson = response.data;

    // Convert response data to Server User Model.
    const serverUser = new ServerUserModel();
    serverUser.fromJson(responseJson);

    // Return Server User Model.
    return serverUser;
  } catch (error: unknown) {
    // Handle Axios errors
    if (axios.isAxiosError(error)) {
      console.log('Axios Error');
      const data = error.response.data;
      if (data['message'] === 'EMAIL_ALREADY_EXISTS') {
        throw new Error(AuthError.ACCOUNT_ALREADY_EXISTS);
      } else {
        console.log(data['message']);
        throw new Error(AuthError.INTERNAL_SERVER_ERROR);
      }
    } else {
      console.log(error);
      throw new Error(AuthError.INTERNAL_SERVER_ERROR);
    }
  }
};

/**
 * Method to handle firebase login.
 * @param loginUserDto DTO Object for logging in a new user.
 */
export const loginWithEmailAddressAndPassword = async (
  loginUserDto: LoginUserDto,
): Promise<void> => {
  try {
    // Attempt to login with provided credentials.
    await firebaseAuth.signInWithEmailAndPassword(
      loginUserDto.emailAddress,
      loginUserDto.password,
    );
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

/**
 * Method to handle logging out
 */
export const logout = async (): Promise<void> => {
  await firebaseAuth.signOut();
};

/**
 * Method to fetch Firebase Logged In User.
 * @returns Firebase User object
 */
export const currentUser = (): FirebaseAuthTypes.User => {
  return firebaseAuth.currentUser;
};
