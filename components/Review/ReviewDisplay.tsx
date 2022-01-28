import React, {ReactNode} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';
import EmptyDataAnimation from '../Lottie/EmptyDataAnimation';
import ReviewCardComponent from './ReviewCard';

type Props = {
  reviews: any[];
  productId: string;
  headerComponent: ReactNode;
};

/**
 * Component to display all the reviews for the product.
 * @param reviews list of reviews to display.
 * @param productId ID for the product.
 * @param headerComponent Components to display before the list of reviews.
 */
const ReviewDisplayComponent: React.FC<Props> = ({
  reviews,
  productId,
  headerComponent,
}) => (
  <FlatList
    ListHeaderComponent={
      <React.Fragment>
        {headerComponent}
        <Title style={styles.titleView}>Reviews:</Title>
      </React.Fragment>
    }
    ListEmptyComponent={
      <EmptyDataAnimation
        message={'No Reviews Available. Add Some Reviews To Rate The Product!'}
      />
    }
    centerContent={true}
    data={reviews}
    keyExtractor={(review) => review.id}
    renderItem={(review) => (
      <ReviewCardComponent productId={productId} review={review.item} />
    )}
  />
);

const styles = StyleSheet.create({
  titleView: {
    margin: 20,
  },
});

export default ReviewDisplayComponent;
