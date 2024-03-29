import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const firestoreDb = firestore();
const userDb = firestoreDb.collection('users');

/**
 * Firebase Auth Email and Password Registration.
 * @param email Email of the user.
 * @param password Password of the user.
 */
export const emailAndPasswordRegister = async (
  email: string,
  password: string,
): Promise<void> => {
  try {
    // Register the user to firebase auth
    const result = await auth().createUserWithEmailAndPassword(email, password);
    const user = result.user;

    // Save the user object to firestore.
    await userDb.doc(user.uid).set(user.toJSON());
  } catch (error) {
    // If the email address is already registered.
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('The email address you provided is already in use.');
    }

    // If its an invalid email.
    if (error.code === 'auth/invalid-email') {
      throw new Error('The email address you provided is invalid.');
    }
  }
};

/**
 * Firebase Auth Email and Password Login.
 * @param email Email of the user.
 * @param password Password of the user.
 */
export const emailAndPasswordLogin = async (
  email: string,
  password: string,
): Promise<void> => {
  try {
    // Log the user in with the firebase auth
    await auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    // If the user does not exist
    if (error.code === 'auth/user-not-found') {
      throw new Error('This email is not registered to any account.');
    }

    // If the user submittted a wrong password.
    if (error.code === 'auth/wrong-password') {
      throw new Error('You have typed a wrong password, please try again.');
    }
  }
};

/**
 * Log the user out.
 */
export const logout = async (): Promise<void> => {
  await auth().signOut();
};

/**
 * Returns the logged in user object.
 * @returns Firebase User object
 */
export const currentUser = (): FirebaseAuthTypes.User => {
  return auth().currentUser;
};
