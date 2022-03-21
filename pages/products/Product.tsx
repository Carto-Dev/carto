import {DrawerScreenProps} from '@react-navigation/drawer';
import {CompositeScreenProps} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Snackbar, Text, useTheme} from 'react-native-paper';
import ErrorAnimation from '../../components/Lottie/ErrorAnimation';
import LoadingAnimation from '../../components/Lottie/LoadingAnimation';
import ProductWrapperComponent from '../../components/Product/ProductWrapperComponent';
import ReviewWrapperComponent from '../../components/Review/ReviewWrapper';
import {Connectivity} from '../../enum/connectivity-error.enum';
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
  const [visible, setVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const theme = useTheme();

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  // Product State.
  const [product, setProduct] = useState<ProductModel>(new ProductModel());

  const loadProduct = (mounted: boolean) =>
    productService
      .fetchProductById(route.params.id)
      .then((fetchedProduct) => (mounted ? setProduct(fetchedProduct) : null))
      .catch((error) => {
        if (error.message === Connectivity.OFFLINE.toString()) {
          setErrorMessage('You are offline');
        } else {
          console.log(error);
          setErrorMessage('Something went wrong, please try again later');
        }

        setError(true);
      })
      .finally(() => (mounted ? setLoading(false) : null));

  // Listening to product changes and reflecting the same.
  useEffect(() => {
    let mounted = true;

    loadProduct(mounted);

    return () => {
      mounted = false;
    };
  }, []);

  const openSnackBar = (messageString: string) => {
    setMessage(messageString);
    setVisible(true);
  };

  if (error) {
    return <ErrorAnimation message={errorMessage} />;
  }

  return loading ? (
    <LoadingAnimation message="Fetching Product Details" />
  ) : (
    <View>
      <ReviewWrapperComponent
        headerComponent={
          <ProductWrapperComponent
            product={product}
            openSnackbar={openSnackBar}
          />
        }
        productId={route.params.id}
        reviews={product.reviews}
        refreshProduct={() => loadProduct(true)}
      />
      <Snackbar
        style={{
          backgroundColor: theme.colors.background,
        }}
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: 'Close',
          onPress: () => setVisible(false),
        }}>
        <Text>{message}</Text>
      </Snackbar>
    </View>
  );
};

export default ProductPage;
