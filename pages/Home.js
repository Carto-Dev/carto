import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const HomePage = (props) => {
  return (
    <View style={styles.rootView}>
      <Text>Home</Text>
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

export default HomePage;
