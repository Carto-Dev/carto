import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import MyProductComponent from '../../components/Products/MyProduct';
import * as ProductUtils from '../../utils/products';
import * as AuthUtils from '../../utils/auth';
import LoadingAnimation from '../../components/Lottie/LoadingAnimation';
import EmptyDataAnimation from '../../components/Lottie/EmptyDataAnimation';

const MyProductsOverviewPage: React.FC = () => {
  // Theme Hook.
  const theme = useTheme();

  // Products Array State.
  const [userProducts, setUserProducts] = useState([]);

  // Loading state.
  const [loading, setLoading] = useState(true);

  // Fetch the products from firebase and save those products in state.
  useEffect(() => {
    const user = AuthUtils.currentUser();
    return ProductUtils.fetchUserProducts(user.uid).onSnapshot(
      (querySnapshot) => {
        setUserProducts(ProductUtils.convertToProducts(querySnapshot));
        setLoading(false);
      },
      (error) => console.log(error),
    );
  }, []);

  return !loading ? (
    <FlatList
      style={{backgroundColor: theme.colors.surface}}
      centerContent={true}
      data={userProducts}
      keyExtractor={(product) => product.id}
      ListEmptyComponent={
        <EmptyDataAnimation
          message={'No Products Available. Add Some Products To Sell Today!'}
        />
      }
      renderItem={(c) => {
        const product = c.item;

        return (
          <MyProductComponent
            id={product.id}
            title={product.title}
            description={product.description}
            cost={product.cost}
            categories={product.categories}
            imgLinks={product.imgLinks}
          />
        );
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
