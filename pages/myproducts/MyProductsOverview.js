import firestore from '@react-native-firebase/firestore';
import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {List, Title, useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import routes from '../../constants/routes';
import * as ProductActions from './../../store/actions/products';

const MyProductsOverviewPage = ({navigation}) => {
  const productsSlice = useSelector((state) => state.products);
  const authSlice = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    return firestore()
      .collection('products')
      .where('userId', '==', authSlice.uid)
      .onSnapshot(
        (querySnapshot) =>
          dispatch(ProductActions.fetchUserProducts(querySnapshot)),
        (error) => console.log(error),
      );
  }, [authSlice.uid, dispatch]);

  return productsSlice.userProducts.length !== 0 ? (
    <FlatList
      style={{backgroundColor: theme.colors.surface}}
      centerContent={true}
      data={productsSlice.userProducts}
      keyExtractor={(product) => product.id}
      renderItem={(c) => {
        return (
          <View>
            <List.Accordion
              title={c.item.title}
              left={(props) => <List.Icon {...props} icon="cart" />}>
              <List.Item
                title="Title"
                description={c.item.title}
                left={(props) => <List.Icon {...props} icon="format-title" />}
              />
              <List.Item
                title="Description"
                description={c.item.description}
                left={(props) => <List.Icon {...props} icon="card-text" />}
              />
              <List.Item
                title="Price"
                description={c.item.cost}
                left={(props) => <List.Icon {...props} icon="currency-usd" />}
              />
              <List.Item
                titleStyle={{color: theme.colors.primary}}
                title="Edit"
                left={(props) => (
                  <List.Icon
                    {...props}
                    color={theme.colors.primary}
                    icon="pen"
                  />
                )}
                onPress={() => {
                  navigation.navigate(routes.pages.product_form_page, {
                    action: 'edit',
                    data: {
                      id: c.item.id,
                      title: c.item.title,
                      description: c.item.description,
                      cost: c.item.cost,
                      categories: c.item.categories,
                      imageUris: c.item.imgLinks,
                    },
                  });
                }}
              />
              <List.Item
                titleStyle={{color: theme.colors.primary}}
                title="Delete"
                left={(props) => (
                  <List.Icon
                    {...props}
                    color={theme.colors.primary}
                    icon="trash-can"
                  />
                )}
                onPress={async () => {
                  await dispatch(ProductActions.deleteProduct(c.item.id));
                }}
              />
            </List.Accordion>
          </View>
        );
      }}
    />
  ) : (
    <View style={styles.centerView}>
      <Title>Go on and add some products!</Title>
    </View>
  );
};

const styles = StyleSheet.create({
  rootView: {
    width: '100%',
  },
  centerView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyProductsOverviewPage;
