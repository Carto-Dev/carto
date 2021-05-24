import React, { useState } from 'react';
import {
  Button,
  Caption,
  Card,
  Dialog,
  Headline,
  Paragraph,
  Portal,
  Title,
} from 'react-native-paper';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import * as AuthUtils from './../../utils/auth';
import * as ReviewUtils from './../../utils/reviews';
import StarReviewComponent from './StarReview';
import { useNavigation } from '@react-navigation/native';
import routes from '../../constants/routes';

/**
 * Card Component to display individual reviews.
 * @param review The actual review object
 * @param param0 ID of the product
 */
const ReviewCardComponent = ({ review, productId }) => {
  const deleteReview = async () => {
    await ReviewUtils.deleteReview(review, productId);
  };

  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const routeToUpdateReviewPage = () => {
    const routeParams = {
      id: productId,
      isEdit: true,
      review: review,
      starsGiven: review.stars,
      text: review.review,
      images: review.images,
    };

    navigation.navigate(routes.pages.review_page, routeParams);
  };

  return (
    <React.Fragment>
      <Card style={styles.mainView}>
        <Card.Content>
          <View style={styles.reviewView}>
            <Headline style={styles.reviewNameText}>
              {review.reviewerName}'s Review
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
                keyExtractor={(image) => image}
                renderItem={(image) => (
                  <Image
                    source={{ uri: image.item }}
                    style={styles.reviewImageStyles}
                  />
                )}
              />
            </React.Fragment>
          )}
          <Paragraph>
            {review.review.length > 0 ? review.review : 'No Review'}
          </Paragraph>
          <Caption>
            Have they bought the product?{' '}
            {review.hasBoughtProduct ? 'Yes' : 'No'}
          </Caption>
        </Card.Content>
        {AuthUtils.currentUser().uid === review.reviewerId && (
          <Card.Actions>
            <View style={styles.buttonView}>
              <Button onPress={routeToUpdateReviewPage}>Update Review</Button>
              <Button onPress={deleteReview}>Delete Review</Button>
            </View>
          </Card.Actions>
        )}
      </Card>
      <Portal>
        <Dialog
          visible={visible}
          dismissable
          onDismiss={() => setVisible(false)}>
          <StarReviewComponent
            id={productId}
            isEdit={true}
            review={review}
            starsGiven={review.stars}
            text={review.review}
            closeDialog={() => {
              setVisible(false);
            }}
          />
        </Dialog>
      </Portal>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  mainView: {
    margin: 20,
  },
  starsText: {
    padding: 10,
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
  reviewNameText: { maxWidth: 200 },
  buttonView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  reviewImageStyles: {
    width: 400,
    height: 300,
    margin: 5,
  },
});

export default ReviewCardComponent;
