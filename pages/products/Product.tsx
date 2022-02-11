import {DrawerScreenProps} from '@react-navigation/drawer';
import {CompositeScreenProps} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import LoadingAnimation from '../../components/Lottie/LoadingAnimation';
import ProductWrapperComponent from '../../components/Product/ProductWrapperComponent';
import ReviewWrapperComponent from '../../components/Review/ReviewWrapper';
import {ProductModel} from '../../models/product.model';
import {HomeDrawerParamList} from '../../types/home-drawer.type';
import {ProductsStackParamList} from '../../types/products-stack.type';
import * as productService from './../../services/products.service';

type Props = CompositeScreenProps<
  StackScreenProps<ProductsStackParamList, 'Product'>,
  DrawerScreenProps<HomeDrawerParamList>
>;

/**
 * Display Product details for the selected product.
 * @param route Route details from React Navigation
 */
const ProductPage: React.FC<Props> = ({route}) => {
  // Loading State
  const [loading, setLoading] = useState<boolean>(true);

  // Product State.
  const [product, setProduct] = useState<ProductModel>(new ProductModel());

  // Listening to product changes and reflecting the same.
  useEffect(() => {
    let mounted = true;

    productService
      .fetchProductById(route.params.id)
      .then((fetchedProduct) => (mounted ? setProduct(fetchedProduct) : null))
      .catch((error) => console.log(error))
      .finally(() => (mounted ? setLoading(false) : null));

    return () => {
      mounted = false;
    };
  }, []);

  return loading ? (
    <LoadingAnimation message="Fetching Product Details" />
  ) : (
    <View>
      <ReviewWrapperComponent
        headerComponent={<ProductWrapperComponent product={product} />}
        productId={route.params.id}
        reviews={product.reviews}
      />
    </View>
  );
};

export default ProductPage;
