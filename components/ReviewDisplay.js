import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';
import ReviewCardComponent from './ReviewCard';

const ReviewDisplayComponent = ({reviews, productId}) => (
  <FlatList
    style={styles.mainView}
    ListHeaderComponent={<Title>Reviews:</Title>}
    centerContent={true}
    data={reviews}
    keyExtractor={(review) => review.id}
    renderItem={(review) => (
      <ReviewCardComponent productId={productId} review={review.item} />
    )}
  />
);

const styles = StyleSheet.create({
  mainView: {
    margin: 10,
  },
});

export default ReviewDisplayComponent;
