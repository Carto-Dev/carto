import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {withTheme, Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import * as authActions from './../store/actions/auth';

const StartPage = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const name = auth.name == null ? 'Please Log In' : auth.name;

  const onGoogleSingInButtonPressed = () => {
    dispatch(authActions.googleSignIn()).catch((error) => {
      console.log(error);
    });
  };

  return (
    <View style={styles.rootView}>
      <Text>{name}</Text>
      <Button onPress={onGoogleSingInButtonPressed}>Google Sign In Try</Button>
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

export default withTheme(StartPage);
