import {GoogleSignin} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';

export const googleSignIn = async () => {
  const {accessToken, idToken} = await GoogleSignin.signIn();

  const googleCredential = auth.GoogleAuthProvider.credential(
    idToken,
    accessToken,
  );

  await auth().signInWithCredential(googleCredential);
};

export const emailAndPasswordRegister = async (email, password) => {
  try {
    await auth().createUserWithEmailAndPassword(email, password);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('The email address you provided is already in use.');
    }

    if (error.code === 'auth/invalid-email') {
      throw new Error('The email address you provided is invalid.');
    }
  }
};

export const emailAndPasswordLogin = async (email, password) => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      throw new Error('This email is not registered to any account.');
    }

    if (error.code === 'auth/wrong-password') {
      throw new Error('You have typed a wrong password, please try again.');
    }
  }
};

export const logout = async () => {
  await auth().signOut();
};

export const currentUser = () => {
  return auth().currentUser;
};
