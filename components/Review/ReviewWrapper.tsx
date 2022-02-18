import React, {ReactNode} from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import ReviewFormComponent from './ReviewForm';
import ReviewBarChartComponent from './ReviewBarChart';
import ReviewDisplayComponent from './ReviewDisplay';
import ReviewTotalComponent from './ReviewTotal';
import {ReviewModel} from '../../models/review.model';

type Props = {
  productId: number;
  reviews: ReviewModel[];
  headerComponent: ReactNode;
  refreshProduct: () => void;
};

/**
 * Wrapper component for displaying reviews.
 * @param id ID of the product.
 */
const ReviewWrapperComponent: React.FC<Props> = ({
  productId,
  reviews,
  headerComponent,
  refreshProduct,
}) => {
  const [reviewBreakdown, setReviewBreakdown] = useState<{
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  }>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });

  // Subscribing to Firestore changes and fetching
  // reviews.
  useEffect(() => {
    const initialReviewBreakdown = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    reviews.forEach((review) => (initialReviewBreakdown[review.stars] += 1));

    setReviewBreakdown(initialReviewBreakdown);
  }, [reviews]);

  return (
    <ReviewDisplayComponent
      refreshProduct={refreshProduct}
      reviews={reviews}
      productId={productId}
      headerComponent={
        <React.Fragment>
          {headerComponent}
          <ReviewTotalComponent
            totalReviews={reviews.length}
            totalStars={
              reviews.length > 0
                ? reviews
                    .map((review) => review.stars)
                    .reduce(
                      (previousValue, currentValue) =>
                        previousValue + currentValue,
                    )
                : 0
            }
          />
          <ReviewBarChartComponent reviewBreakdown={reviewBreakdown} />
          <ReviewFormComponent id={productId} refreshProduct={refreshProduct} />
        </React.Fragment>
      }
    />
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
