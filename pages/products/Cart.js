import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {DataTable, IconButton, Text, Title, useTheme} from 'react-native-paper';
import EmptyDataAnimation from '../../components/Lottie/EmptyDataAnimation';
import * as CartUtils from './../../utils/cart';
import Icon from 'react-native-vector-icons/Foundation';

const CartPage = () => {
  const [cartProducts, setCartProducts] = useState([]);

  const [total, setTotal] = useState(0);

  // Theme Hook
  const {colors} = useTheme();

  useEffect(
    () =>
      CartUtils.fetchProductsFromCart().onSnapshot(async (product) => {
        let tempTotal = 0;
        setCartProducts(
          await Promise.all(
            product.data().products.map(async (p) => {
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
                  <Icon size={20} color={colors.primary} name="page-edit" />
                </View>
              </DataTable.Cell>
              <DataTable.Cell>
                <View style={styles.centerView}>
                  <Icon size={20} color={colors.primary} name="trash" />
                </View>
              </DataTable.Cell>
            </DataTable.Row>
          )}
          ListFooterComponent={
            <View style={styles.totalTextView}>
              <Title>Total: </Title>
              <Title
                style={{
                  color: colors.primary,
                  ...styles.totalText,
                  borderColor: colors.primary,
                }}>
                {total.toFixed(2)}
              </Title>
            </View>
          }
        />
      </DataTable>
    </View>
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
});

export default CartPage;
