import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator, Title, Text} from 'react-native-paper';

const SplashPage = () => {
  return (
    <View style={styles.rootView}>
      <View>
        <Title>Carto.</Title>
        <Text>For the most premium shoppers</Text>
      </View>
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
