import React from 'react';
import {TextInput, Title, Headline} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';

/**
 * Search bar component.
 */
const SearchbarComponent = () => {
  return (
    <View style={styles.marginView}>
      <Title>
        <Headline>Good Morning!</Headline>
      </Title>
      <TextInput
        left={<TextInput.Icon name="magnify" />}
        mode="outlined"
        label="Search"
        autoCapitalize="none"
        keyboardType="default"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  marginView: {
    margin: 20,
  },
});

export default SearchbarComponent;
