import {Dimensions, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Title} from 'react-native-paper';
import {CategoryModel} from '../../models/category.model';
import React from 'react';

export type Props = {
  category: CategoryModel;
};

const Category: React.FC<Props> = ({category}) => {
  return (
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
