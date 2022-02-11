import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Title, useTheme} from 'react-native-paper';
import {CategoryModel} from '../../models/category.model';
import * as productService from './../../services/products.service';

/**
 * Component for displaying all the possible categories for the products.
 * Displays them using a premade list of categories and their respective images.
 */
const CategoriesComponent: React.FC = () => {
  // Fetching the theme config
  const theme = useTheme();

  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<CategoryModel[]>([]);

  useEffect(() => {
    let mounted = true;
    productService
      .fetchCategories()
      .then((categories) => (mounted ? setCategories(categories) : null))
      .catch((error) => console.log(error))
      .finally(() => (mounted ? setLoading(false) : null));

    return () => {
      mounted = false;
    };
  }, []);

  const loadingCategories = () => (
    <View>
      <View style={styles.marginView}>
        <Title>Categories</Title>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.loadingView}></View>
        <View style={styles.loadingView}></View>
        <View style={styles.loadingView}></View>
      </ScrollView>
    </View>
  );
  const loadedCategories = () => (
    <View>
      <View style={styles.marginView}>
        <Title>Categories</Title>
      </View>
      <View>
        <FlatList
          style={{backgroundColor: theme.colors.surface}}
          showsHorizontalScrollIndicator={false}
          centerContent={true}
          data={categories}
          keyExtractor={(category) => category.id.toString()}
          horizontal={true}
          renderItem={(c) => {
            return (
              <View style={styles.imageView}>
                <ImageBackground
                  imageStyle={styles.images}
                  style={styles.image}
                  source={{uri: c.item.img}}>
                  <View style={styles.imageTextView}>
                    <Title style={styles.text}>{c.item.text}</Title>
                  </View>
                </ImageBackground>
              </View>
            );
          }}
        />
      </View>
    </View>
  );

  return loading ? loadingCategories() : loadedCategories();
};

const styles = StyleSheet.create({
  marginView: {
    margin: Dimensions.get('screen').width * 0.04,
  },
  loadingView: {
    width: Dimensions.get('screen').width * 0.7,
    height: Dimensions.get('screen').height * 0.25,
    margin: Dimensions.get('screen').width * 0.03,
    backgroundColor: 'rgb(33, 33, 33)',
  },
  imageView: {
    width: Dimensions.get('screen').width * 0.7,
    height: Dimensions.get('screen').height * 0.25,
    margin: Dimensions.get('screen').width * 0.03,
  },
  images: {
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
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  text: {
    textAlign: 'center',
  },
});

export default CategoriesComponent;
