import {GoogleSignin} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';

export const SIGN_IN = 'SIGN IN';
export const SIGN_OUT = 'SIGN OUT';

export const googleSignIn = () => {
  return async (dispatch) => {
    const {accessToken, idToken} = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(
      idToken,
      accessToken,
    );

    const result = await auth().signInWithCredential(googleCredential);
    const user = result.user;

    dispatch({
      type: SIGN_IN,
      payload: {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
      },
    });
  };
};

export const emailAndPasswordRegister = (email, password) => {
  return async (dispatch) => {
    try {
      const result = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = result.user;

      dispatch({
        type: SIGN_IN,
        payload: {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
        },
      });
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('The email address you provided is already in use.');
      }

      if (error.code === 'auth/invalid-email') {
        throw new Error('The email address you provided is invalid.');
      }
    }
  };
};

export const emailAndPasswordLogin = (email, password) => {
  return async (dispatch) => {
    try {
      const result = await auth().signInWithEmailAndPassword(email, password);
      const user = result.user;

      dispatch({
        type: SIGN_IN,
        payload: {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
        },
      });
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        throw new Error('This email is not registered to any account.');
      }

      if (error.code === 'auth/wrong-password') {
        throw new Error('You have typed a wrong password, please try again.');
      }
    }
  };
};

export const autoLogin = (uid, name, email) => {
  const payload = {
    uid: uid,
    name: name,
    email: email,
  };

  return {
    type: SIGN_IN,
    payload: payload,
  };
};

export const logout = () => {
  return async (dispatch) => {
    await auth().signOut();

    dispatch({
      type: SIGN_OUT,
    });
  };
};
