import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';
import * as ProductUtils from '../../utils/products';
import LoadingAnimation from '../Lottie/LoadingAnimation';
import CategoriesComponent from './Categories';
import ProductCardComponent from './ProductCard';
import SearchbarComponent from './Searchbar';

/**
 * Generates a list of the top 5 new added products
 * and displays them for the user.
 */
const ProductsViewComponent = () => {
  // State hook to store the products.
  const [products, setProducts] = useState([]);

  // Loading state.
  const [loading, setLoading] = useState(true);

  // UseEffect to listen to Firestore document changes and
  // save them to state for displaying.
  useEffect(() => {
    return ProductUtils.fetchProducts().onSnapshot(
      (querySnapshot) => {
        setProducts(ProductUtils.convertToProducts(querySnapshot));
        setLoading(false);
      },
      (error) => console.log(error),
    );
  }, []);

  return (
    <View style={styles.rootView}>
      <FlatList
        ListHeaderComponent={
          <React.Fragment>
            <SearchbarComponent />
            <CategoriesComponent />
            <View style={styles.titleView}>
              <Title>Newest Additions</Title>
            </View>
          </React.Fragment>
        }
        centerContent={true}
        data={!loading ? products : ['Loading']}
        keyExtractor={(item) => (loading ? item : item.id)}
        renderItem={(c) =>
          !loading ? (
            <ProductCardComponent product={c.item} />
          ) : (
            <LoadingAnimation message="Fetching Products For you!" />
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
  productView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  marginView: {
    padding: 20,
  },
  imageView: {
    height: 150,
    width: 150,
  },
  titleView: {
    margin: 20,
  },
});

export default ProductsViewComponent;
