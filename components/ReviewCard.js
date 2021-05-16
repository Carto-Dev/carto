import React, {useState} from 'react';
import {
  Button,
  Caption,
  Card,
  Dialog,
  Paragraph,
  Portal,
  Title,
} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import * as AuthUtils from './../utils/auth';
import * as ReviewUtils from './../utils/reviews';
import StarReviewComponent from './StarReview';

const ReviewCardComponent = ({review, productId}) => {
  const deleteReview = async () => {
    await ReviewUtils.deleteReview(review, productId);
  };

  const [visible, setVisible] = useState(false);

  return (
    <React.Fragment>
      <Card style={styles.mainView}>
        <Card.Content>
          <View style={styles.reviewView}>
            <Title style={styles.reviewNameText}>
              {review.reviewerName}'s Review
            </Title>
            <Button mode="outlined" icon="star">
              {review.stars}
            </Button>
          </View>
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
              <Button onPress={() => setVisible(true)}>Update Review</Button>
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
    marginVertical: 10,
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
  reviewNameText: {maxWidth: 200},
  buttonView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default ReviewCardComponent;
