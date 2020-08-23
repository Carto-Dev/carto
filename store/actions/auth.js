import {GoogleSignin} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';

export const SIGN_IN = 'SIGN IN';

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
        photoURL: user.photoURL,
      },
    });
  };
};

export const autoLogin = (uid, name, email, photo) => {
  const payload = {
    uid: uid,
    name: name,
    email: email,
    photoURL: photo,
  };

  return {
    type: SIGN_IN,
    payload: payload,
  };
};
