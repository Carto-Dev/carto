import React from 'react';
import {
  Button,
  Caption,
  Card,
  Headline,
  Paragraph,
  Title,
} from 'react-native-paper';
import {Dimensions, FlatList, Image, StyleSheet, View} from 'react-native';
import * as authService from './../../services/auth.service';
import * as ReviewUtils from '../../utils/reviews';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProductsStackParamList} from '../../types/products-stack.type';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {HomeDrawerParamList} from '../../types/home-drawer.type';
import {ReviewModel} from '../../models/review.model';

type Props = {
  review: ReviewModel;
  productId: number;
};

type ReviewCardNavigationType = CompositeNavigationProp<
  StackNavigationProp<ProductsStackParamList, 'Product'>,
  DrawerNavigationProp<HomeDrawerParamList>
>;

/**
 * Card Component to display individual reviews.
 * Interaction includes deleting and updating the review.
 * @param review The actual review object
 * @param param0 ID of the product
 */
const ReviewCardComponent: React.FC<Props> = ({review, productId}) => {
  // Navigation hook.
  const navigation = useNavigation<ReviewCardNavigationType>();

  /**
   * Function to delete the review object from database.
   */
  const deleteReview = async () => {
    // Deletes the review object from firestore.
    await ReviewUtils.deleteReview(review, productId);
  };

  /**
   * Routes the user to the update review page
   */
  const routeToUpdateReviewPage = () => {
    // Pushing the review form on stack.
    navigation.navigate('Reviews', {
      id: productId,
      isEdit: true,
      review: review,
      starsGiven: review.stars,
      text: review.text,
      imageLinks: review.images,
    });
  };

  // Width Dimensions
  const width = Dimensions.get('screen').width * 0.82;

  return (
    <React.Fragment>
      <Card style={styles.mainView}>
        <Card.Content>
          <View style={styles.reviewView}>
            <Headline style={styles.reviewNameText}>
              {review.user.displayName}'s Review
            </Headline>
            <Button mode="outlined" icon="star">
              {review.stars}
            </Button>
          </View>
          {review.images.length > 0 && (
            <React.Fragment>
              <Title>Product Images</Title>
              <FlatList
                pagingEnabled={true}
                centerContent={true}
                data={review.images}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(image) => image.id.toString()}
                renderItem={(image) => (
                  <Image
                    source={{uri: image.item.image}}
                    style={{...styles.reviewImageStyles, width: width}}
                  />
                )}
              />
            </React.Fragment>
          )}
          <Paragraph>
            {review.text.length > 0 ? review.text : 'No Review'}
          </Paragraph>
          <Caption>Have they bought the product? No</Caption>
        </Card.Content>
        {authService.currentUser().uid === review.user.firebaseId && (
          <Card.Actions>
            <View style={styles.buttonView}>
              <Button onPress={routeToUpdateReviewPage}>Update Review</Button>
              <Button onPress={deleteReview}>Delete Review</Button>
            </View>
          </Card.Actions>
        )}
      </Card>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  mainView: {
    margin: Dimensions.get('screen').height * 0.03,
  },
  starsText: {
    padding: Dimensions.get('screen').height * 0.03,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  reviewView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewNameText: {maxWidth: Dimensions.get('screen').width * 0.9},
  buttonView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: Dimensions.get('screen').width * 0.9,
  },
  reviewImageStyles: {
    height: Dimensions.get('screen').height * 0.5,
  },
});

export default ReviewCardComponent;
