import {DrawerScreenProps} from '@react-navigation/drawer';
import {CompositeScreenProps} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';
import ReviewFormComponent from '../../components/Review/ReviewForm';
import {HomeDrawerParamList} from '../../types/home-drawer.type';
import {ProductsStackParamList} from '../../types/products-stack.type';

type Props = CompositeScreenProps<
  StackScreenProps<ProductsStackParamList, 'Reviews'>,
  DrawerScreenProps<HomeDrawerParamList>
>;

/**
 * Display Review Update Form for specific reviews.
 * @param route Route details
 */
const ReviewPage: React.FC<Props> = ({route}) => {
  return (
    <React.Fragment>
      <View style={styles.titleView}>
        <Title>Update Your Review</Title>
      </View>
      <ReviewFormComponent
        id={route.params.id}
        isEdit={route.params.isEdit}
        review={route.params.review}
        starsGiven={route.params.starsGiven}
        text={route.params.text}
        imageLinks={route.params.imageLinks}
        refreshProduct={() => {}}
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  titleView: {
    marginHorizontal: 20,
  },
});

export default ReviewPage;
