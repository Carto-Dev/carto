import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

const ProductPage = () => {
  return (
    <View style={styles.rootView}>
      <Text>Hello From ProductPage</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductPage;
