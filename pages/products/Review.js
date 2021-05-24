import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';
import ReviewFormComponent from '../../components/Review/ReviewForm';

const ReviewPage = ({route}) => {
  return (
    <React.Fragment>
      <View style={styles.titleView}>
        <Title>Update Your Review</Title>
      </View>
      <ReviewFormComponent
        id={route.params.id}
        isEdit={route.params.isEdit}
        review={route.params.review}
        starsGiven={route.params.starsGiven}
        text={route.params.text}
        imageLinks={route.params.images}
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  titleView: {
    marginHorizontal: 20,
  },
});

export default ReviewPage;
