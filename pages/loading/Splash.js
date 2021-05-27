import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Title, Text, useTheme} from 'react-native-paper';
import LoadingAnimation from '../../components/Lottie/LoadingAnimation';

/**
 * Splash page to display when fetching logged in user details.
 */
const SplashPage = () => {
  const theme = useTheme();

  return (
    <View
      style={{...styles.rootView, backgroundColor: theme.colors.background}}>
      <View>
        <Title>Carto.</Title>
        <Text>For the most premium shoppers</Text>
      </View>
      <LoadingAnimation message="Loading The App For You!" />
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
