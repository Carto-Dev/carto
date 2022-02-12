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
import * as authService from './../../services/auth.service';
import * as reviewService from './../../services/reviews.service';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProductsStackParamList} from '../../types/products-stack.type';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {HomeDrawerParamList} from '../../types/home-drawer.type';
import {ReviewModel} from '../../models/review.model';
import {DeleteReviewDto} from '../../dtos/reviews/delete-review.dto';

type Props = {
  review: ReviewModel;
  productId: number;
  refreshProduct: () => void;
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
const ReviewCardComponent: React.FC<Props> = ({
  review,
  productId,
  refreshProduct,
}) => {
  // Navigation hook.
  const navigation = useNavigation<ReviewCardNavigationType>();

  const [visible, setVisible] = useState<boolean>(false);

  /**
   * Function to delete the review object from database.
   */
  const deleteReview = async () => {
    await reviewService.deleteReview(DeleteReviewDto.newDto(review.id));

    refreshProduct();
  };

  /**
   * Routes the user to the update review page
   */
  const routeToUpdateReviewPage = () => {
    // Pushing the review form on stack.
    navigation.push('Reviews', {
      id: productId,
      isEdit: true,
      review: review,
      starsGiven: review.stars,
      text: review.text,
      imageLinks: review.images.map((image) => image.image),
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
        </Card.Content>
        {authService.currentUser().uid === review.user.firebaseId && (
          <Card.Actions>
            <View style={styles.buttonView}>
              <Button onPress={routeToUpdateReviewPage}>Update Review</Button>
              <Button onPress={() => setVisible(true)}>Delete Review</Button>
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
