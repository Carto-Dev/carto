import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import ReviewComponent from '../../components/Review';

const ProductPage = ({route}) => {
  console.log(route.params);

  return (
    <View>
      <ReviewComponent id={route.params.id} />
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

export default ProductPage;
