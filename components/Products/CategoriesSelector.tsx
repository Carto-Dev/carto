import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Chip} from 'react-native-paper';
import {CategoryModel} from '../../models/category.model';
import LoadingAnimation from '../Lottie/LoadingAnimation';
import * as productService from './../../services/products.service';

export interface CategoriesSelectorProps {
  selectedCategories: CategoryModel[];
  selectCategory: (category: CategoryModel) => void;
}

const CategoriesSelector: React.FC<CategoriesSelectorProps> = ({
  selectCategory,
  selectedCategories,
}) => {
  const theme = useTheme();
  const [fetchedCategories, setFetchedCategories] = useState<CategoryModel[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;

    productService
      .fetchCategories()
      .then((categories) => (mounted ? setFetchedCategories(categories) : null))
      .catch((error) => console.log(error))
      .finally(() => (mounted ? setLoading(false) : null));

    return () => {
      mounted = false;
    };
  }, []);

  const checkSelected = (category: CategoryModel) =>
    selectedCategories.filter(
      (selectedCategory) => selectedCategory.id === category.id,
    ).length > 0;

  return loading ? (
    <LoadingAnimation message="Fetching categories for you!" />
  ) : (
    <View style={styles.chipView}>
      {fetchedCategories.map((category) => (
        <Chip
          onPress={() => selectCategory(category)}
          key={category.key}
          style={
            checkSelected(category)
              ? {...styles.chipStyle, backgroundColor: theme.colors.primary}
              : styles.chipStyle
          }
          mode="outlined">
          {category.text}
        </Chip>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  chipView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: Dimensions.get('screen').height * 0.01,
  },

  chipStyle: {
    margin: Dimensions.get('screen').height * 0.005,
  },
});

export default CategoriesSelector;
