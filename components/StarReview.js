import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Card, IconButton, TextInput} from 'react-native-paper';
import {Review} from '../models/review';
import * as ReviewUtils from '../utils/reviews';

const StarReviewComponent = ({
  id,
  isEdit = false,
  review = new Review(),
  starsGiven = 1,
  text = '',
  closeDialog = () => {},
}) => {
  const [noOfStars, setNoOfStars] = useState(starsGiven);
  const [reviewText, setReviewText] = useState(text);
  const stars = [1, 2, 3, 4, 5];
  const {colors} = useTheme();

  const handleReviewSubmit = async () => {
    if (!isEdit) {
      await ReviewUtils.submitReview(id, noOfStars, reviewText);
    } else {
      await ReviewUtils.updateReview(reviewText, noOfStars, review, id);
      closeDialog();
    }
  };

  return (
    <Card style={styles.rootView}>
      <Card.Content style={styles.contentView}>
        {stars.map((star) => (
          <IconButton
            key={star}
            color={colors.primary}
            icon={star <= noOfStars ? 'star' : 'star-outline'}
            onPress={() => setNoOfStars(star)}
          />
        ))}
      </Card.Content>
      <Card.Content>
        <TextInput
          mode="outlined"
          label="Your Review"
          value={reviewText}
          onChangeText={(value) => setReviewText(value)}
          autoCapitalize="none"
          keyboardType="default"
        />
        <View style={styles.buttonLayout}>
          <Button mode="contained" icon="plus" onPress={handleReviewSubmit}>
            Submit Review
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  rootView: {
    margin: 20,
  },

  contentView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  buttonLayout: {
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StarReviewComponent;
