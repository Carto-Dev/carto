import React, {useEffect, useState} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';
import UserReviewCardComponent from '../../components/Review/UserReviewCard';
import * as ReviewUtils from './../../utils/reviews';

const MyReviewsPage = () => {
  const [userReviews, setUserReviews] = useState([]);

  useEffect(
    () =>
      ReviewUtils.getReviewsByUser().onSnapshot(
        (data) => setUserReviews(data.data().reviews),
        (error) => console.log(error),
      ),
    [],
  );

  return userReviews.length > 0 ? (
    <FlatList
      ListHeaderComponent={
        <View style={styles.titleView}>
          <Title>Your Reviews</Title>
        </View>
      }
      centerContent={true}
      data={userReviews}
      keyExtractor={(review) => review.id}
      renderItem={(review) => (
        <UserReviewCardComponent
          review={review.item}
          productId={review.item.productId}
        />
      )}
    />
  ) : (
    <View style={styles.centerView}>
      <Title>No reviews present!</Title>
    </View>
  );
};

const styles = StyleSheet.create({
  titleView: {
    marginHorizontal: 20,
  },

  centerView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MyReviewsPage;
