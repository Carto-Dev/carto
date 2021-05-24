import React from 'react';
import {useEffect, useState} from 'react';
import ReviewFormComponent from './ReviewForm';
import ReviewBarChartComponent from './ReviewBarChart';
import * as ReviewUtils from './../../utils/reviews';
import {Title} from 'react-native-paper';
import ReviewDisplayComponent from './ReviewDisplay';

/**
 * Wrapper component for displaying reviews.
 * @param id ID of the product.
 */
const ReviewWrapperComponent = ({id}) => {
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
          <ReviewBarChartComponent
            reviewBreakdown={reviewData.reviewBreakdown}
          />
          <ReviewFormComponent id={id} />
        </React.Fragment>
      }
    />
  ) : (
    <Title>Loading</Title>
  );
};

export default ReviewWrapperComponent;
