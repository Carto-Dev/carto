import React from 'react';
import { View, StyleSheet, FlatList, ImageBackground } from 'react-native';
import { Title, useTheme } from 'react-native-paper';
import categories from '../../constants/categories';

/**
 * Component for displaying all the possible categories for the products.
 * Displays them using a premade list of categories and their respective images.
 */
const CategoriesComponent = () => {

  // Fetching the theme config
  const theme = useTheme();

  return (
    <View>
      <View style={styles.marginView}>
        <Title>Categories</Title>
      </View>
      <View>
        <FlatList
          style={{ backgroundColor: theme.colors.surface }}
          showsHorizontalScrollIndicator={false}
          centerContent={true}
          data={categories}
          keyExtractor={(category) => category.key}
          horizontal={true}
          renderItem={(c) => {
            return (
              <View style={styles.imageView}>
                <ImageBackground
                  imageStyle={styles.images}
                  style={styles.image}
                  source={c.item.img}>
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
};

const styles = StyleSheet.create({
  marginView: {
    margin: 20,
  },
  imageView: {
    width: 300,
    height: 200,
    padding: 10,
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
