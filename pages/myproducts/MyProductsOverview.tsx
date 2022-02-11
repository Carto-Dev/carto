import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import MyProductComponent from '../../components/Products/MyProduct';
import LoadingAnimation from '../../components/Lottie/LoadingAnimation';
import EmptyDataAnimation from '../../components/Lottie/EmptyDataAnimation';
import {ProductModel} from '../../models/product.model';
import * as productService from './../../services/products.service';

const MyProductsOverviewPage: React.FC = () => {
  // Theme Hook.
  const theme = useTheme();

  // Products Array State.
  const [userProducts, setUserProducts] = useState<ProductModel[]>([]);

  // Loading state.
  const [loading, setLoading] = useState(true);

  // Fetch the products from firebase and save those products in state.
  useEffect(() => {
    let mounted = true;

    productService
      .fetchProductsByLoggedInUser()
      .then((products) => (mounted ? setUserProducts(products) : null))
      .catch((error) => console.log(error))
      .finally(() => (mounted ? setLoading(false) : null));

    return () => {
      mounted = false;
    };
  }, []);

  return !loading ? (
    <FlatList
      style={{backgroundColor: theme.colors.surface}}
      centerContent={true}
      data={userProducts}
      keyExtractor={(product) => product.id.toString()}
      ListEmptyComponent={
        <EmptyDataAnimation
          message={'No Products Available. Add Some Products To Sell Today!'}
        />
      }
      renderItem={(c) => {
        const product = c.item;

        return <MyProductComponent product={c.item} />;
      }}
    />
  ) : (
    <View style={styles.centerView}>
      <LoadingAnimation message="Fetching Your Products!" />
    </View>
  );
};

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyProductsOverviewPage;
