import React from 'react';
import {View} from 'react-native';
import ReviewWrapperComponent from '../../components/Review/ReviewWrapper';

/**
 * Display Product details for the selected product.
 * @param route Route details from React Navigation
 */
const ProductPage = ({route}) => {
  return (
    <View>
      <ReviewWrapperComponent id={route.params.id} />
    </View>
  );
};

export default ProductPage;
