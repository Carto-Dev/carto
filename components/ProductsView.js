import React, {useState, useEffect} from 'react';
import {View, FlatList, Image, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';
import * as ProductUtils from './../utils/products';

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
      <FlatList
        centerContent={true}
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={(c) => {
          return (
            <View style={styles.productView}>
              <Image
                style={styles.imageView}
                source={{uri: c.item.imgLinks[0]}}
              />
              <Title>{c.item.title}</Title>
            </View>
          );
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
});

export default ProductsViewComponent;
