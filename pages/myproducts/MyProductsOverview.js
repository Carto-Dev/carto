import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Title, useTheme} from 'react-native-paper';
import MyProductComponent from '../../components/Products/MyProduct';
import * as ProductUtils from '../../utils/products';
import * as AuthUtils from '../../utils/auth';

const MyProductsOverviewPage = () => {
  const theme = useTheme();
  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    const user = AuthUtils.currentUser();
    return ProductUtils.fetchUserProducts(user.uid).onSnapshot(
      (querySnapshot) =>
        setUserProducts(ProductUtils.convertToProducts(querySnapshot)),
      (error) => console.log(error),
    );
  }, []);

  return userProducts.length !== 0 ? (
    <FlatList
      style={{backgroundColor: theme.colors.surface}}
      centerContent={true}
      data={userProducts}
      keyExtractor={(product) => product.id}
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
      <Title>Go on and add some products!</Title>
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
