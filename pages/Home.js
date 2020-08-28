import React from 'react';
import {useSelector} from 'react-redux';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import * as authActions from './../store/actions/auth';

const HomePage = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onSignOutButtonPressed = () => {
    dispatch(authActions.logout());
  };

  return (
    <View style={styles.rootView}>
      <Text>{auth.email}</Text>
      <Text>Home!</Text>
      <Button onPress={onSignOutButtonPressed}>Sign Out</Button>
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

export default HomePage;
