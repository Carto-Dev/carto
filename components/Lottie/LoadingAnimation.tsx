import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import LottieView from 'lottie-react-native';

type Props = {
  message: string;
};

/**
 * Component to display loading status.
 * @param message Message to display to indicate loading state.
 */
const LoadingAnimation: React.FC<Props> = ({message}) => {
  return (
    <View style={styles.mainView}>
      <LottieView
        source={require('./../../lottie/loading.json')}
        style={styles.lottieView}
        autoPlay
        loop
      />
      <Text>{message}</Text>
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
  },
});

export default LoadingAnimation;
