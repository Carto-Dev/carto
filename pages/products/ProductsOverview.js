import React from 'react';
import {ScrollView, StyleSheet, View, LogBox} from 'react-native';
import CategoriesComponent from '../../components/Categories';
import ProductsViewComponent from '../../components/ProductsView';
import SearchbarComponent from '../../components/Searchbar';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.',
]);

const ProductsOverviewPage = () => {
  return (
    <View style={styles.rootView}>
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
        <SearchbarComponent />
        <CategoriesComponent />
        <ProductsViewComponent />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
});

export default ProductsOverviewPage;
