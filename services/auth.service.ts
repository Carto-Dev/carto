import {AuthError} from './../enum/auth-error.enum';
import {ServerUserModel} from './../models/server-user.model';
import {server} from './../utils/axios.util';
import {CreateUserDto} from './../dtos/auth/create-user.dto';
import axios from 'axios';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

const firebaseAuth = auth();

export const registerWithEmailAddressAndPassword = async (
  createUserDto: CreateUserDto,
): Promise<ServerUserModel> => {
  // TO BE TESTED
  try {
    const body = createUserDto.toJson();
    const headers = {
      'content-type': 'application/json',
    };

    const response = await server.post('v1/auth/register', body, {
      headers,
    });

    const responseJson = response.data;

    const serverUser = new ServerUserModel();
    serverUser.fromJson(responseJson);

    return serverUser;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log('Axios Error');
      console.log(error);
    } else {
      throw error;
    }
  }
};

export const loginWithEmailAddressAndPassword = async (
  email: string,
  password: string,
): Promise<void> => {
  // TO BE TESTED
  try {
    await firebaseAuth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      throw new Error(AuthError.USER_NOT_FOUND);
    }

    if (error.code === 'auth/wrong-password') {
      throw new Error(AuthError.WRONG_PASSWORD);
    }
  }
};
