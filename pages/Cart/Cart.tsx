import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList, Dimensions} from 'react-native';
import {useTheme, Text, Snackbar, Title, Button} from 'react-native-paper';
import {CartItemModel} from '../../models/cart-item.model';
import * as cartService from '../../services/cart.service';
import * as orderService from '../../services/order.service';
import LoadingAnimation from '../../components/Lottie/LoadingAnimation';
import CartTileComponent from '../../components/Cart/CartTileComponent';
import EmptyDataAnimation from '../../components/Lottie/EmptyDataAnimation';
import CartTotalComponent from '../../components/Cart/CartTotalComponent';
import {Connectivity} from '../../enum/connectivity-error.enum';
import ErrorAnimation from '../../components/Lottie/ErrorAnimation';

/**
 * Cart Page Implementation
 */
const CartPage: React.FC = () => {
  // Cart Products State.
  const [cartProducts, setCartProducts] = useState<CartItemModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackbarMessage, setSnackBarMessage] = useState<string>('');
  const theme = useTheme();

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const loadCartProducts = (mounted: boolean) =>
    cartService
      .fetchCartItems()
      .then((cartItems) => (mounted ? setCartProducts(cartItems) : null))
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

  const displaySnackbar = (message: string) => {
    setSnackBarMessage(message);
    setSnackBarVisible(true);
  };

  const confirmOrder = async () => {
    try {
      await orderService.createOrder();
      displaySnackbar('Order Successfully placed');
    } catch (error) {
      if (error.message === Connectivity.OFFLINE.toString()) {
        displaySnackbar('You are offline.');
      } else {
        console.log(error);
        displaySnackbar('Something went wrong, please try again later');
      }
    }
  };

  /**
   * Listen to cart products changes.
   */
  useEffect(() => {
    let mounted = true;

    loadCartProducts(mounted);

    return () => {
      mounted = false;
    };
  }, []);

  if (error) {
    return <ErrorAnimation message={errorMessage} />;
  }

  return loading ? (
    <LoadingAnimation message="Loading Cart" />
  ) : (
    <React.Fragment>
      <FlatList
        centerContent={true}
        data={cartProducts}
        keyExtractor={(item) => item.id}
        renderItem={(cartProduct) => (
          <CartTileComponent
            cartItem={cartProduct.item}
            refreshCart={() => loadCartProducts(true)}
            displaySnackbar={displaySnackbar}
          />
        )}
        ListEmptyComponent={
          <EmptyDataAnimation message="No cart items present" />
        }
        ListHeaderComponent={<Title style={styles.titleText}>Cart</Title>}
        ListFooterComponent={
          <React.Fragment>
            <CartTotalComponent
              total={
                cartProducts.length > 0
                  ? cartProducts
                      .map(
                        (cartProduct) =>
                          cartProduct.quantity * cartProduct.product.cost,
                      )
                      .reduce(
                        (previousValue, currentValue) =>
                          previousValue + currentValue,
                      )
                  : 0
              }
            />
            <Button mode="text" onPress={confirmOrder}>
              Place Order
            </Button>
          </React.Fragment>
        }
      />
      <Snackbar
        style={{
          backgroundColor: theme.colors.background,
        }}
        visible={snackBarVisible}
        onDismiss={() => setSnackBarVisible(false)}
        action={{
          label: 'OKAY',
          onPress: () => {
            setSnackBarVisible(false);
          },
        }}>
        <Text>{snackbarMessage}</Text>
      </Snackbar>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  titleText: {
    margin: Dimensions.get('screen').width * 0.04,
    fontSize: Dimensions.get('screen').height * 0.04,
  },
});

export default CartPage;
