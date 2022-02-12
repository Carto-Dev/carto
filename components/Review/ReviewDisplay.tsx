import React, {ReactNode, useState} from 'react';
import {Dimensions, FlatList, RefreshControl, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';
import {ReviewModel} from '../../models/review.model';
import EmptyDataAnimation from '../Lottie/EmptyDataAnimation';
import ReviewCardComponent from './ReviewCard';

type Props = {
  reviews: ReviewModel[];
  productId: number;
  headerComponent: ReactNode;
  refreshProduct: () => void;
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
  refreshProduct,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <FlatList
      ListHeaderComponent={
        <React.Fragment>
          {headerComponent}
          <Title style={styles.titleView}>Reviews:</Title>
        </React.Fragment>
      }
      ListEmptyComponent={
        <EmptyDataAnimation
          message={
            'No Reviews Available. Add Some Reviews To Rate The Product!'
          }
        />
      }
      centerContent={true}
      data={reviews}
      keyExtractor={(review) => review.id.toString()}
      renderItem={(review) => (
        <ReviewCardComponent productId={productId} review={review.item} />
      )}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={() => {
            setLoading(true);
            refreshProduct();
            setLoading(false);
          }}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  titleView: {
    margin: Dimensions.get('screen').height * 0.03,
  },
});

export default ReviewDisplayComponent;
