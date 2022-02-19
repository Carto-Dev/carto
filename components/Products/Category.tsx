import {Dimensions, Pressable, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Title} from 'react-native-paper';
import {CategoryModel} from '../../models/category.model';
import React from 'react';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProductsStackParamList} from '../../types/products-stack.type';
import {HomeDrawerParamList} from '../../types/home-drawer.type';
import {DrawerNavigationProp} from '@react-navigation/drawer';

export type Props = {
  category: CategoryModel;
};

export type CategoryNavigatorType = CompositeNavigationProp<
  StackNavigationProp<ProductsStackParamList, 'ProductsOverview'>,
  DrawerNavigationProp<HomeDrawerParamList>
>;

const Category: React.FC<Props> = ({category}) => {
  const navigation = useNavigation<CategoryNavigatorType>();

  return (
    <Pressable
      onPress={() => {
        navigation.push('ProductsByCategory', {
          category: category.key,
        });
      }}>
      <View style={styles.rootView}>
        <FastImage
          style={styles.imageView}
          source={{
            uri: category.img,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.imageTextView}>
          <Title style={styles.text}>{category.text}</Title>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  rootView: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: Dimensions.get('screen').width * 0.04,
  },
  imageView: {
    width: Dimensions.get('screen').width * 0.7,
    height: Dimensions.get('screen').height * 0.25,
    borderRadius: 30,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000000',
  },
  imageTextView: {
    backgroundColor: '#000000a0',
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  text: {
    textAlign: 'center',
  },
});

export default Category;
