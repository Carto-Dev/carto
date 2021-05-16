import React from 'react';
import {useEffect, useState} from 'react';
import ReviewComponent from './Review';
import ReviewBarChartComponent from './ReviewBarChart';
import * as ReviewUtils from './../utils/reviews';
import {Title} from 'react-native-paper';

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
    <React.Fragment>
      <ReviewBarChartComponent reviewBreakdown={reviewData.reviewBreakdown} />
      <ReviewComponent id={id} />
    </React.Fragment>
  ) : (
    <Title>Loading</Title>
  );
};

export default ReviewWrapperComponent;
