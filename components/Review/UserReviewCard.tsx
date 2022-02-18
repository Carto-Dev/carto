import React, {useState} from 'react';
import {
  Button,
  Card,
  Dialog,
  Headline,
  Paragraph,
  Portal,
  Title,
} from 'react-native-paper';
import {Dimensions, FlatList, Image, StyleSheet, View} from 'react-native';
import * as authService from '../../services/auth.service';
import * as reviewService from '../../services/reviews.service';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProductsStackParamList} from '../../types/products-stack.type';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {HomeDrawerParamList} from '../../types/home-drawer.type';
import {UserReview} from '../../models/user-review.model';
import {ReviewModel} from '../../models/review.model';
import {DeleteReviewDto} from '../../dtos/reviews/delete-review.dto';
import {useIsConnected} from 'react-native-offline';
import FastImage from 'react-native-fast-image';

type Props = {
  review: UserReview;
  productId: number;
  refreshReviews: () => void;
};

type UserReviewCardNavigationType = CompositeNavigationProp<
  StackNavigationProp<ProductsStackParamList, 'MyReviews'>,
  DrawerNavigationProp<HomeDrawerParamList>
>;

/**
 * Card Component to display individual reviews by user.
 * Interaction includes deleting and updating the review.
 * @param review The actual review object
 * @param productId ID of the product
 */
const UserReviewCardComponent: React.FC<Props> = ({
  review,
  productId,
  refreshReviews,
}) => {
  // Navigation hook.
  const navigation = useNavigation<UserReviewCardNavigationType>();

  const isConnected = useIsConnected();

  const [visible, setVisible] = useState<boolean>(false);

  /**
   * Function to delete the review object from database.
   */
  const deleteReview = async () => {
    await reviewService.deleteReview(DeleteReviewDto.newDto(review.id));
    refreshReviews();
    setVisible(false);
  };

  /**
   * Routes the user to the update review page
   */
  const routeToUpdateReviewPage = () => {
    const reviewModel = new ReviewModel();
    reviewModel.id = review.id;
    reviewModel.text = review.text;
    reviewModel.stars = review.stars;
    reviewModel.user = review.user;
    reviewModel.images = review.images;

    // Pushing the review form on stack.
    navigation.push('Reviews', {
      id: productId,
      isEdit: true,
      review: reviewModel,
      starsGiven: review.stars,
      text: review.text,
      imageLinks: review.images.map((image) => image.image),
    });
  };

  return (
    <React.Fragment>
      <Card style={styles.mainView}>
        <Card.Content>
          <View style={styles.reviewView}>
            <Headline style={styles.reviewNameText}>
              Your Review of {review.product.title}
            </Headline>
            <Button mode="outlined" icon="star">
              {review.stars}
            </Button>
          </View>
          {review.images.length > 0 && (
            <React.Fragment>
              <Title>Product Images</Title>
              <FlatList
                centerContent={true}
                data={review.images}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(image) => image.id.toString()}
                renderItem={(image) => (
                  <FastImage
                    source={{
                      uri: image.item.image,
                      priority: FastImage.priority.normal,
                    }}
                    style={styles.reviewImageStyles}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                )}
              />
            </React.Fragment>
          )}
          <Paragraph>
            {review.text.length > 0 ? review.text : 'No Review'}
          </Paragraph>
        </Card.Content>
        {authService.currentUser().uid === review.user.firebaseId && (
          <Card.Actions>
            <View style={styles.buttonView}>
              <Button disabled={!isConnected} onPress={routeToUpdateReviewPage}>
                Update Review
              </Button>
              <Button disabled={!isConnected} onPress={() => setVisible(true)}>
                Delete Review
              </Button>
            </View>
          </Card.Actions>
        )}
      </Card>
      <Portal>
        <Dialog
          visible={visible}
          dismissable
          onDismiss={() => setVisible(false)}>
          <Dialog.Title>Delete Confirmation</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you want to delete your review?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={deleteReview}>Yes</Button>
            <Button onPress={() => setVisible(false)}>No</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  mainView: {
    margin: Dimensions.get('screen').width * 0.05,
  },
  reviewView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewNameText: {maxWidth: Dimensions.get('screen').width * 0.6},
  buttonView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: Dimensions.get('screen').width * 0.87,
  },
  reviewImageStyles: {
    width: Dimensions.get('screen').width * 0.95,
    height: Dimensions.get('screen').height * 0.5,
    margin: Dimensions.get('screen').width * 0.001,
  },
});

export default UserReviewCardComponent;
