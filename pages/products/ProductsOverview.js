import React from 'react';
import {useSelector} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import * as authActions from '../../store/actions/auth';

const ProductsOverviewPage = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onSignOutButtonPressed = () => {
    dispatch(authActions.logout());
  };

  return (
    <View style={styles.rootView}>
      <Text>Hello {auth.email}!</Text>
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

export default ProductsOverviewPage;
