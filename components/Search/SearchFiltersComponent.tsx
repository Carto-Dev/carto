import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
  Checkbox,
  List,
  RadioButton,
  Text,
  TextInput,
  Title,
} from 'react-native-paper';
import {CategoryModel} from '../../models/category.model';
import * as productService from './../../services/products.service';

export interface SearchFiltersComponentProps {
  query: string;
  sortBy: string;
  selectedCategories: string[];
  onChangeQuery: (query: string) => void;
  onChangeSortBy: (sortBy: string) => void;
  onAddOrRemoveCategory: (category: string) => void;
}

const SearchFiltersComponent: React.FC<SearchFiltersComponentProps> = ({
  query,
  sortBy,
  selectedCategories,
  onChangeQuery,
  onChangeSortBy,
  onAddOrRemoveCategory,
}) => {
  const [fetchedCategories, setFetchedCategories] = useState<CategoryModel[]>(
    [],
  );

  const [categoriesOpen, setCategoriesOpen] = useState<boolean>(false);
  const [sortByOpen, setSortByOpen] = useState<boolean>(false);

  const theme = useTheme();

  useEffect(() => {
    let mounted = true;

    productService
      .fetchCategories()
      .then((categories) => (mounted ? setFetchedCategories(categories) : null))
      .catch((error) => console.log(error));

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <View style={styles.rootView}>
      <Title>Search For Products</Title>
      <TextInput
        mode="outlined"
        label="Query..."
        value={query === 'EMPTY' ? '' : query}
        onChangeText={onChangeQuery}
        autoCapitalize="none"
      />
      <List.AccordionGroup>
        <List.Accordion
          id="categories"
          title="Select Categories"
          expanded={categoriesOpen}
          onPress={() => setCategoriesOpen(!categoriesOpen)}>
          {fetchedCategories.map((category) => (
            <Checkbox.Item
              label={category.text}
              theme={theme}
              key={category.id.toString()}
              status={
                selectedCategories.filter((c) => c === category.key).length !==
                0
                  ? 'checked'
                  : 'unchecked'
              }
              onPress={() => {
                onAddOrRemoveCategory(category.key);
              }}
            />
          ))}
        </List.Accordion>
        <List.Accordion
          id="sort"
          title="Sort Pricing"
          expanded={sortByOpen}
          onPress={() => setSortByOpen(!sortByOpen)}>
          <RadioButton.Item
            label="Low To High"
            theme={theme}
            value="ASC"
            status={sortBy === 'ASC' ? 'checked' : 'unchecked'}
            onPress={() => onChangeSortBy('ASC')}
          />
          <RadioButton.Item
            label="High To Low"
            theme={theme}
            value="DESC"
            status={sortBy === 'DESC' ? 'checked' : 'unchecked'}
            onPress={() => onChangeSortBy('DESC')}
          />
        </List.Accordion>
      </List.AccordionGroup>
    </View>
  );
};

const styles = StyleSheet.create({
  rootView: {
    marginHorizontal: Dimensions.get('screen').width * 0.04,
  },
});

export default SearchFiltersComponent;
