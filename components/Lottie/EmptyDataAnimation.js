import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import LottieView from 'lottie-react-native';

/**
 * Component to display empty data
 * @param message Message to display to indicate empty data.
 */
const EmptyDataAnimation = ({message}) => {
  return (
    <View style={styles.mainView}>
      <LottieView
        source={require('./../../lottie/empty.json')}
        style={styles.lottieView}
        autoPlay
        loop
      />
      <Text style={styles.textStyle}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  lottieView: {
    height: 200,
    width: 200,
  },
  mainView: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    minHeight: 300,
    padding: 20,
  },
  textStyle: {
    textAlign: 'center',
  },
});

export default EmptyDataAnimation;
