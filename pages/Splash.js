import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';

const SplashPage = () => {
  return (
    <View style={styles.rootView}>
      <Text>Carto</Text>
      <ActivityIndicator animating={true} size={'large'} />
    </View>
  );
};
const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default SplashPage;
