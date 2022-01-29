import {DrawerScreenProps} from '@react-navigation/drawer';
import {CompositeScreenProps} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';
import {Title} from 'react-native-paper';
import ProductWrapperComponent from '../../components/Product/ProductWrapperComponent';
import ReviewWrapperComponent from '../../components/Review/ReviewWrapper';
import {HomeDrawerParamList} from '../../types/home-drawer.type';
import {ProductsStackParamList} from '../../types/products-stack.type';

type Props = CompositeScreenProps<
  StackScreenProps<ProductsStackParamList, 'Product'>,
  DrawerScreenProps<HomeDrawerParamList>
>;

/**
 * Display Product details for the selected product.
 * @param route Route details from React Navigation
 */
const ProductPage: React.FC<Props> = ({route}) => {
  return (
    <View>
      <ReviewWrapperComponent
        headerComponent={<ProductWrapperComponent id={route.params.id} />}
        id={route.params.id}
      />
    </View>
  );
};

export default ProductPage;
