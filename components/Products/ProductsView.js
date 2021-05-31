import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {
  Button,
  List,
  Modal,
  Portal,
  Snackbar,
  Text,
  TextInput,
  Title,
  useTheme,
} from 'react-native-paper';
import * as ProductUtils from '../../utils/products';
import * as CartUtils from '../../utils/cart';
import EmptyDataAnimation from '../Lottie/EmptyDataAnimation';
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

  // Modal Visibility
  const [visible, setVisible] = useState(false);

  // Snackbar Visibility
  const [snackBarVisible, setSnackBarVisible] = useState(false);

  // Product ID State
  const [productId, setProductId] = useState('');

  // Quantity state.
  const [quantity, setQuantity] = useState('1');

  // Theme Hook.
  const theme = useTheme();

  const openCartModal = (id) => {
    setProductId(id);
    setVisible(true);
  };

  const addToCart = async () => {
    CartUtils.addProductToCart(productId, quantity);
    setVisible(false);
    setSnackBarVisible(true);
  };

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
          data={!loading ? products : ['Loading']}
          keyExtractor={(item) => (loading ? item : item.id)}
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
            <Title>Select The Quantity Of Products To Add In Cart</Title>
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
        theme={theme}
        visible={snackBarVisible}
        onDismiss={() => setSnackBarVisible(false)}
        action={{
          label: 'Undo',
          onPress: () => {
            setSnackBarVisible(false);
          },
        }}>
        Added To Cart!
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
    padding: 20,
  },
  imageView: {
    height: 150,
    width: 150,
  },
  titleView: {
    margin: 20,
  },
  modalView: {
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContainer: {
    margin: 20,
    borderRadius: 20,
  },
  mainModalView: {
    padding: 20,
  },
  addToCartButtonStyle: {
    marginVertical: 20,
  },
});

export default ProductsViewComponent;
