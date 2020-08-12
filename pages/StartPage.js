import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {withTheme} from 'react-native-paper';

const StartPage = (props) => {
  return (
    <View
      style={{
        ...styles.rootView,
        backgroundColor: props.theme.colors.background,
      }}>
      <Text style={{color: props.theme.colors.text}}>Hello, World</Text>
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

export default withTheme(StartPage);
