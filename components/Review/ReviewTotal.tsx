import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme, Title} from 'react-native-paper';

type Props = {
  totalReviews: number;
  totalStars: number;
};

/**
 * Display Average Stars for the product
 * @param totalReviews Total Reviews Given
 * @param totalStars Total Stars Given
 */
const ReviewTotalComponent: React.FC<Props> = ({totalReviews, totalStars}) => {
  // Theme Hook
  const {colors} = useTheme();

  return (
    <View style={styles.ratingTextView}>
      <Title>Rating: </Title>
      <Title
        style={{
          color: colors.primary,
          ...styles.ratingText,
          borderColor: colors.primary,
        }}>
        {totalReviews !== 0 ? (totalStars / totalReviews).toFixed(2) : '0.00'}
      </Title>
    </View>
  );
};

const styles = StyleSheet.create({
  ratingText: {
    padding: 10,
    borderWidth: 2,
  },
  ratingTextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
});

export default ReviewTotalComponent;
