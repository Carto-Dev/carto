import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Card, IconButton, TextInput} from 'react-native-paper';
import * as ReviewUtils from '../utils/reviews';

const StarReviewComponent = ({id}) => {
  const [noOfStars, setNoOfStars] = useState(1);
  const [reviewText, setReviewText] = useState('');
  const stars = [1, 2, 3, 4, 5];
  const {colors} = useTheme();

  const handleReviewSubmit = async () => {
    await ReviewUtils.submitReview(id, noOfStars, reviewText);
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
    margin: 10,
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
