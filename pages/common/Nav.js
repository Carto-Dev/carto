import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

const NavPage = () => {
  return (
    <View style={styles.rootView}>
      <Text>Hello From NavPage!</Text>
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

export default NavPage;
