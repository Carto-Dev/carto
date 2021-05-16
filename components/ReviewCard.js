import React from 'react';
import {Button, Caption, Card, Paragraph, Title} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

const ReviewCardComponent = ({review}) => {
  return (
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
          Have they bought the product? {review.hasBoughtProduct ? 'Yes' : 'No'}
        </Caption>
      </Card.Content>
    </Card>
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
});

export default ReviewCardComponent;
