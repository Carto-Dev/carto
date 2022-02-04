import {ServerUserModel} from './../models/server-user.model';
import {server} from './../utils/axios.util';
import {CreateUserDto} from './../dtos/auth/create-user.dto';
import axios from 'axios';

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
