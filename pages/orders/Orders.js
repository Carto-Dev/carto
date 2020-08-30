import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

const OrdersPage = () => {
  return (
    <View style={styles.rootView}>
      <Text>Hello From OrdersPage</Text>
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

export default OrdersPage;
