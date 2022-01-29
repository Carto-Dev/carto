import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';
import {
  DataTable,
  Modal,
  Portal,
  TextInput,
  Title,
  useTheme,
  Button,
  Text,
  Snackbar,
} from 'react-native-paper';
import EmptyDataAnimation from '../../components/Lottie/EmptyDataAnimation';
import * as CartUtils from '../../utils/cart';
import Icon from 'react-native-vector-icons/Foundation';

/**
 * Cart Page Implementation
 */
const CartPage: React.FC = () => {
  // Cart Products State.
  const [cartProducts, setCartProducts] = useState([]);

  // Total cost state.
  const [total, setTotal] = useState(0);

  // Modal Visibility
  const [visible, setVisible] = useState(false);

  // Snackbar Visibility
  const [snackBarVisible, setSnackBarVisible] = useState(false);

  // Product ID State
  const [productId, setProductId] = useState('');

  // Quantity state.
  const [quantity, setQuantity] = useState('1');

  // Theme Hook
  const theme = useTheme();

  /**
   * Delete product from cart function
   * @param id Product ID
   */
  const deleteProductFromCart = (id: string) => {
    Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete this product from your cart?',
      [
        {
          text: 'OKAY',
          onPress: async () => await CartUtils.deleteProductFromCart(id),
        },
        {
          text: 'CANCEL',
        },
      ],
    );
  };

  /**
   * Open up the modal to update quantity.
   * @param id Product ID
   * @param quantity Product Quantity
   */
  const openCartModal = (id: string, quantity: string) => {
    setProductId(id);
    setQuantity(quantity);
    setVisible(true);
  };

  /**
   * Update the cart with new quantity.
   */
  const updateCart = async () => {
    await CartUtils.updateProductInCart(productId, Number(quantity));
    setVisible(false);
    setSnackBarVisible(true);
  };

  /**
   * Listen to cart products changes.
   */
  useEffect(
    () =>
      CartUtils.fetchProductsFromCart().onSnapshot(async (products) => {
        let tempTotal = 0;
        setCartProducts(
          await Promise.all(
            products.data().products.map(async (p) => {
              const product = await CartUtils.fetchActualProduct(p.productId);
              const productTotal = Number(p.quantity) * Number(product.cost);

              tempTotal += productTotal;

              return {
                id: p.id,
                product: product,
                quantity: p.quantity,
              };
            }),
          ),
        );

        setTotal(tempTotal);
      }),
    [],
  );

  return (
    <React.Fragment>
      <View style={styles.rootView}>
        <DataTable>
          <FlatList
            ListHeaderComponent={
              <React.Fragment>
                <Title style={styles.titleStyle}>Your Cart: </Title>
                <DataTable.Header>
                  <DataTable.Title>Title</DataTable.Title>
                  <DataTable.Title>Cost</DataTable.Title>
                  <DataTable.Title>Quantity</DataTable.Title>
                  <DataTable.Title>Total</DataTable.Title>
                  <DataTable.Title>Update</DataTable.Title>
                  <DataTable.Title>Delete</DataTable.Title>
                </DataTable.Header>
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
            data={cartProducts}
            keyExtractor={(item) => item.id}
            renderItem={(item) => (
              <DataTable.Row>
                <DataTable.Cell>{item.item.product.title}</DataTable.Cell>
                <DataTable.Cell>{item.item.product.cost}</DataTable.Cell>
                <DataTable.Cell>{item.item.quantity}</DataTable.Cell>
                <DataTable.Cell>
                  {Number(
                    Number(item.item.product.cost) * Number(item.item.quantity),
                  ).toFixed(2)}
                </DataTable.Cell>
                <DataTable.Cell>
                  <View style={styles.centerView}>
                    <Icon
                      onPress={() =>
                        openCartModal(item.item.id, item.item.quantity)
                      }
                      size={20}
                      color={theme.colors.primary}
                      name="page-edit"
                    />
                  </View>
                </DataTable.Cell>
                <DataTable.Cell>
                  <View style={styles.centerView}>
                    <Icon
                      onPress={() => deleteProductFromCart(item.item.id)}
                      size={20}
                      color={theme.colors.primary}
                      name="trash"
                    />
                  </View>
                </DataTable.Cell>
              </DataTable.Row>
            )}
            ListFooterComponent={
              <View style={styles.totalTextView}>
                <Title>Total: </Title>
                <Title
                  style={{
                    color: theme.colors.primary,
                    ...styles.totalText,
                    borderColor: theme.colors.primary,
                  }}>
                  {total.toFixed(2)}
                </Title>
              </View>
            }
          />
        </DataTable>
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
            <Title>Update The Quantity Of Products To Add In Cart</Title>
            <TextInput
              label="Quantity"
              keyboardType="numeric"
              value={quantity}
              mode="outlined"
              onChangeText={(text) => setQuantity(text)}
            />
            <Button onPress={updateCart}>Update</Button>
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
          label: 'OKAY',
          onPress: () => {
            setSnackBarVisible(false);
          },
        }}>
        <Text>Updated Cart!</Text>
      </Snackbar>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 20,
  },
  totalText: {
    padding: 10,
    borderWidth: 2,
  },
  totalTextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  titleStyle: {
    marginHorizontal: 20,
  },
  centerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default CartPage;
