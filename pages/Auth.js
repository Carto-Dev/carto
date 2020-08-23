import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import * as authActions from '../store/actions/auth';
import {useDispatch, useSelector} from 'react-redux';

const AuthPage = () => {
  const dispatch = useDispatch();

  const onGoogleSignInButtonPressed = () => {
    dispatch(authActions.googleSignIn()).catch((error) => {
      console.log(error);
    });
  };

  return (
    <View style={styles.rootView}>
      <Button onPress={onGoogleSignInButtonPressed}>Google Sign In</Button>
    </View>
  );
};
const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthPage;
