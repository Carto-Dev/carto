import React from 'react';
import {useEffect, useState} from 'react';
import StarReviewComponent from './StarReview';
import ReviewBarChartComponent from './ReviewBarChart';
import * as ReviewUtils from './../utils/reviews';
import {Title} from 'react-native-paper';
import ReviewDisplayComponent from './ReviewDisplay';
import {ScrollView} from 'react-native';

const ReviewWrapperComponent = ({id}) => {
  const [reviewData, setReviewData] = useState({});
  const [loading, setloading] = useState(true);

  useEffect(
    () =>
      ReviewUtils.getReviewData(id).onSnapshot(
        (data) => {
          setReviewData(data.data());
          setloading(false);
        },
        (error) => console.log(error),
      ),
    [id],
  );

  return !loading ? (
    <ScrollView>
      <ReviewBarChartComponent reviewBreakdown={reviewData.reviewBreakdown} />
      <StarReviewComponent id={id} />
      <ReviewDisplayComponent reviews={reviewData.reviews} />
    </ScrollView>
  ) : (
    <Title>Loading</Title>
  );
};

export default ReviewWrapperComponent;
