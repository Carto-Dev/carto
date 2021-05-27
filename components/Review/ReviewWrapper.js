import React from 'react';
import {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import ReviewFormComponent from './ReviewForm';
import ReviewBarChartComponent from './ReviewBarChart';
import * as ReviewUtils from './../../utils/reviews';
import ReviewDisplayComponent from './ReviewDisplay';
import LoadingAnimation from '../Lottie/LoadingAnimation';

/**
 * Wrapper component for displaying reviews.
 * @param id ID of the product.
 */
const ReviewWrapperComponent = ({id, headerComponent}) => {
  // State hook for saving review data.
  const [reviewData, setReviewData] = useState({});

  // State hook for setting loading status
  const [loading, setLoading] = useState(true);

  // Subscribing to Firestore changes and fetching
  // reviews.
  useEffect(
    () =>
      ReviewUtils.getReviewData(id).onSnapshot(
        (data) => {
          setReviewData(data.data());
          setLoading(false);
        },
        (error) => console.log(error),
      ),
    [id],
  );

  return !loading ? (
    <ReviewDisplayComponent
      reviews={reviewData.reviews}
      productId={id}
      headerComponent={
        <React.Fragment>
          {headerComponent}
          <ReviewBarChartComponent
            reviewBreakdown={reviewData.reviewBreakdown}
          />
          <ReviewFormComponent id={id} />
        </React.Fragment>
      }
    />
  ) : (
    <View styles={styles.loadingView}>
      <LoadingAnimation message="Fetching Products Details For You!" />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReviewWrapperComponent;
