import React from 'react';
import {View} from 'react-native';
import {Title} from 'react-native-paper';
import ReviewWrapperComponent from '../../components/Review/ReviewWrapper';

/**
 * Display Product details for the selected product.
 * @param route Route details from React Navigation
 */
const ProductPage = ({route}) => {
  return (
    <View>
      <ReviewWrapperComponent
        headerComponent={
          <React.Fragment>
            <View>
              <Title>Product View</Title>
            </View>
          </React.Fragment>
        }
        id={route.params.id}
      />
    </View>
  );
};

export default ProductPage;
