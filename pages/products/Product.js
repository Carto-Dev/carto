import React from 'react';
import {View} from 'react-native';
import ReviewWrapperComponent from '../../components/Review/ReviewWrapper';

const ProductPage = ({route}) => {
  return (
    <View>
      <ReviewWrapperComponent id={route.params.id} />
    </View>
  );
};

export default ProductPage;
