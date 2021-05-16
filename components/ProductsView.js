import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';
import * as ProductUtils from './../utils/products';
import ProductCardComponent from './ProductCard';

const ProductsViewComponent = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    return ProductUtils.fetchProducts().onSnapshot(
      (querySnapshot) => {
        setProducts(ProductUtils.convertToProducts(querySnapshot));
      },
      (error) => console.log(error),
    );
  }, []);

  return (
    <View style={styles.marginView}>
      <View style={styles.titleView}>
        <Title>Newest Additions</Title>
      </View>
      <FlatList
        centerContent={true}
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={(c) => {
          console.log(c.item);
          return <ProductCardComponent product={c.item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  productView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  marginView: {
    margin: 20,
  },
  imageView: {
    height: 150,
    width: 150,
  },
  titleView: {
    marginVertical: 20,
  },
});

export default ProductsViewComponent;
