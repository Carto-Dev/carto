import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Button, List, Menu, Title} from 'react-native-paper';
import {CategoryModel} from '../../models/category.model';
import * as productsService from './../../services/products.service';

type Props = {
  setCategory: (category: string) => Promise<void>;
  categoryKey: string;
};

const CategoriesFilter: React.FC<Props> = ({setCategory, categoryKey}) => {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const openMenu = () => setMenuVisible(true);

  const closeMenu = () => setMenuVisible(false);

  const fetchCategories = (mounted: boolean) =>
    productsService
      .fetchCategories()
      .then((categories) => (mounted ? setCategories(categories) : null))
      .catch((error) => console.log(error))
      .finally(() => (mounted ? setLoading(false) : null));

  useEffect(() => {
    let mounted = true;
    fetchCategories(mounted);

    return () => {
      mounted = false;
    };
  }, []);

  return !loading ? (
    <React.Fragment>
      <Title style={styles.titleView}>
        {categories.filter((c) => c.key === categoryKey)[0].text}
      </Title>
      <List.Item
        title="Show Products By"
        right={(_) => (
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={<Button onPress={openMenu}>Show Categories</Button>}>
            {categories.map((category) => (
              <Menu.Item
                key={category.id.toString()}
                onPress={async () => await setCategory(category.key)}
                title={category.text}
              />
            ))}
          </Menu>
        )}
      />
    </React.Fragment>
  ) : (
    <Title>Loading</Title>
  );
};

const styles = StyleSheet.create({
  titleView: {
    margin: Dimensions.get('screen').width * 0.04,
  },
});

export default CategoriesFilter;
