import React from 'react';
import {TextInput, Title, Headline} from 'react-native-paper';
import {View, StyleSheet, Pressable} from 'react-native';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {ProductsStackParamList} from '../../types/products-stack.type';
import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {HomeDrawerParamList} from '../../types/home-drawer.type';

type SearchBarNavigatorType = CompositeNavigationProp<
  StackNavigationProp<ProductsStackParamList, 'ProductsOverview'>,
  DrawerNavigationProp<HomeDrawerParamList>
>;

/**
 * Search bar component.
 */
const SearchbarComponent: React.FC = () => {
  const navigation = useNavigation<SearchBarNavigatorType>();

  return (
    <View style={styles.marginView}>
      <Title>
        <Headline>Good Morning!</Headline>
      </Title>
      <Pressable onPress={() => navigation.push('Search')}>
        <TextInput
          disabled
          left={<TextInput.Icon name="magnify" />}
          mode="outlined"
          label="Search"
          autoCapitalize="none"
          keyboardType="default"
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  marginView: {
    margin: 20,
  },
});

export default SearchbarComponent;
