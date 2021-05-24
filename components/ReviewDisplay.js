import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';
import ReviewCardComponent from './ReviewCard';

const ReviewDisplayComponent = ({reviews, productId, headerComponent}) => (
  <FlatList
    ListHeaderComponent={
      <React.Fragment>
        {headerComponent}
        <Title style={styles.titleView}>Reviews:</Title>
      </React.Fragment>
    }
    centerContent={true}
    data={reviews}
    keyExtractor={(review) => review.id}
    renderItem={(review) => (
      <ReviewCardComponent productId={productId} review={review.item} />
    )}
  />
);

const styles = StyleSheet.create({
  titleView: {
    margin: 20,
  },
});

export default ReviewDisplayComponent;
