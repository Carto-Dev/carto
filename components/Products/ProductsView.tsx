import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet, Dimensions} from 'react-native';
import {
  Button,
  Modal,
  Portal,
  Snackbar,
  Text,
  TextInput,
  Title,
  useTheme,
} from 'react-native-paper';
import * as productService from './../../services/products.service';
import EmptyDataAnimation from '../Lottie/EmptyDataAnimation';
import LoadingAnimation from '../Lottie/LoadingAnimation';
import CategoriesComponent from './Categories';
import ProductCardComponent from './ProductCard';
import SearchbarComponent from './Searchbar';
import {ProductModel} from '../../models/product.model';

/**
 * Generates a list of the top 5 new added products
 * and displays them for the user.
 */
const ProductsViewComponent: React.FC = () => {
  // State hook to store the products.
  const [products, setProducts] = useState<ProductModel[]>([]);

  // Loading state.
  const [loading, setLoading] = useState(true);

  // Modal Visibility
  const [visible, setVisible] = useState(false);

  // Snackbar Visibility
  const [snackBarVisible, setSnackBarVisible] = useState(false);

  // Product ID State
  const [productId, setProductId] = useState<number>(0);

  // Quantity state.
  const [quantity, setQuantity] = useState('1');

  // Theme Hook.
  const theme = useTheme();

  /**
   * Open up the modal to enter quantity.
   * @param id Product ID
   */
  const openCartModal = (id: number) => {
    setProductId(id);
    setVisible(true);
  };

  /**
   * Add to cart function.
   */
  const addToCart = async () => {
    // await CartUtils.addProductToCart(productId, Number(quantity));
    setVisible(false);
    setSnackBarVisible(true);
  };

  // UseEffect to listen to Firestore document changes and
  // save them to state for displaying.
  useEffect(() => {
    let mounted = true;
    productService
      .fetchNewProducts()
      .then((products) => (mounted ? setProducts(products) : null))
      .catch((error) => console.log(error))
      .finally(() => (mounted ? setLoading(false) : null));

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <React.Fragment>
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
          ListEmptyComponent={
            <EmptyDataAnimation
              message={
                'No Products Available. Add Some Products To Sell Today!'
              }
            />
          }
          centerContent={true}
          data={!loading ? products : []}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(c) =>
            !loading ? (
              <ProductCardComponent
                product={c.item}
                openCartModal={openCartModal}
              />
            ) : (
              <LoadingAnimation message="Fetching Products For you!" />
            )
          }
        />
      </View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          dismissable
          style={styles.modalView}
          contentContainerStyle={{
            ...styles.modalContainer,
            backgroundColor: theme.colors.background,
          }}>
          <View style={styles.mainModalView}>
            <Title>Enter The Quantity Of Products To Add In Cart</Title>
            <TextInput
              label="Quantity"
              keyboardType="numeric"
              value={quantity}
              mode="outlined"
              onChangeText={(text) => setQuantity(text)}
            />
            <Button style={styles.addToCartButtonStyle} onPress={addToCart}>
              Add To Cart
            </Button>
          </View>
        </Modal>
      </Portal>
      <Snackbar
        style={{
          backgroundColor: theme.colors.background,
        }}
        visible={snackBarVisible}
        onDismiss={() => setSnackBarVisible(false)}
        action={{
          label: 'Undo',
          onPress: () => {
            setSnackBarVisible(false);
          },
        }}>
        <Text>Added To Cart</Text>
      </Snackbar>
    </React.Fragment>
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
    padding: Dimensions.get('screen').width * 0.04,
  },
  titleView: {
    margin: Dimensions.get('screen').width * 0.04,
  },
  modalView: {
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContainer: {
    margin: Dimensions.get('screen').width * 0.04,
    borderRadius: Dimensions.get('screen').width * 0.04,
  },
  mainModalView: {
    padding: Dimensions.get('screen').width * 0.04,
  },
  addToCartButtonStyle: {
    marginVertical: Dimensions.get('screen').width * 0.04,
  },
});

export default ProductsViewComponent;
