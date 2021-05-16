import React from 'react';
import {View, StyleSheet} from 'react-native';
import ReviewWrapperComponent from '../../components/ReviewWrapper';

const ProductPage = ({route}) => {
  return (
    <View>
      <ReviewWrapperComponent id={route.params.id} />
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
