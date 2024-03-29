import React, {useEffect, useState} from 'react';
import {FlatList, View, StyleSheet, RefreshControl} from 'react-native';
import {Title} from 'react-native-paper';
import EmptyDataAnimation from '../../components/Lottie/EmptyDataAnimation';
import ErrorAnimation from '../../components/Lottie/ErrorAnimation';
import LoadingAnimation from '../../components/Lottie/LoadingAnimation';
import UserReviewCardComponent from '../../components/Review/UserReviewCard';
import {Connectivity} from '../../enum/connectivity-error.enum';
import {UserReview} from '../../models/user-review.model';
import * as reviewService from './../../services/reviews.service';

/**
 * Display User Reviews for the logged in user.
 */
const MyReviewsPage: React.FC = () => {
  // State for reviews
  const [userReviews, setUserReviews] = useState<UserReview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const loadUserReviews = (mounted: boolean) =>
    reviewService
      .fetchReviewsByUser()
      .then((reviews) => (mounted ? setUserReviews(reviews) : null))
      .catch((error) => {
        if (error.message === Connectivity.OFFLINE.toString()) {
          setErrorMessage('You are offline');
        } else {
          console.log(error);
          setErrorMessage('Something went wrong, please try again later');
        }

        setError(true);
      })
      .finally(() => (mounted ? setLoading(false) : null));

  // Listen to firebase state changes for reviews.
  useEffect(() => {
    let mounted = true;

    loadUserReviews(mounted);

    return () => {
      mounted = false;
    };
  }, []);

  if (error) {
    return <ErrorAnimation message={errorMessage} />;
  }

  return loading ? (
    <LoadingAnimation message="Loading Reviews" />
  ) : userReviews.length > 0 ? (
    <FlatList
      ListHeaderComponent={
        <View style={styles.titleView}>
          <Title>Your Reviews</Title>
        </View>
      }
      centerContent={true}
      data={userReviews}
      keyExtractor={(review) => review.id.toString()}
      renderItem={(review) => (
        <UserReviewCardComponent
          review={review.item}
          productId={review.item.product.id}
          refreshReviews={() => loadUserReviews(true)}
        />
      )}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={() => loadUserReviews(true)}
        />
      }
    />
  ) : (
    <EmptyDataAnimation message="No reviews found" />
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
