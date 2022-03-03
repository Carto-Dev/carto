import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {Snackbar, Text} from 'react-native-paper';
import CartFormComponent from '../../components/Cart/CartFormComponent';
import LoadingAnimation from '../../components/Lottie/LoadingAnimation';
import ProductCardComponent from '../../components/Products/ProductCard';
import SearchFiltersComponent from '../../components/Search/SearchFiltersComponent';
import useSearch from '../../hooks/useSearch';
import {CartItemModel} from '../../models/cart-item.model';
import * as cartService from './../../services/cart.service';

const Search: React.FC = () => {
  const {
    products,
    query,
    categories,
    sortBy,
    loading,
    setQuery,
    setSortBy,
    setCategories,
  } = useSearch();
  const [productId, setProductId] = useState<number>(0);
  const [visible, setVisible] = useState(false);
  const [snackBarVisible, setSnackBarVisible] = useState(false);

  const theme = useTheme();

  const onChangeQuery = (query: string) => {
    if (query === '') {
      setQuery('EMPTY');
    } else {
      setQuery(query);
    }
  };

  const onChangeSortBy = (sortBy: string) => setSortBy(sortBy);

  const onAddOrRemoveCategory = (category: string) => {
    if (categories.filter((c) => c === category).length > 0) {
      setCategories([...categories.filter((c) => c !== category)]);
    } else {
      setCategories([...categories, category]);
    }
  };

  /**
   * Open up the modal to enter quantity.
   * @param id Product ID
   */
  const openCartModal = (id: number) => {
    setProductId(id);
    setVisible(true);
  };

  /**
   * Add to cart function.
   */
  const addToCart = async (quantity: number) => {
    await cartService.createNewCartItem(
      CartItemModel.newCartItem(
        products.filter((product) => product.id === productId)[0],
        quantity,
      ),
    );
    setVisible(false);
    setSnackBarVisible(true);
  };

  return (
    <React.Fragment>
      <FlatList
        ListHeaderComponent={
          <SearchFiltersComponent
            query={query}
            selectedCategories={categories}
            sortBy={sortBy}
            onChangeQuery={onChangeQuery}
            onChangeSortBy={onChangeSortBy}
            onAddOrRemoveCategory={onAddOrRemoveCategory}
          />
        }
        centerContent={true}
        data={!loading ? products : []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(c) =>
          !loading ? (
            <ProductCardComponent
              product={c.item}
              openCartModal={openCartModal}
            />
          ) : (
            <LoadingAnimation message="Fetching Products For you!" />
          )
        }
      />
      <CartFormComponent
        isOpen={visible}
        onClose={() => setVisible(false)}
        quantity={1}
        onSubmit={addToCart}
      />
      <Snackbar
        style={{
          backgroundColor: theme.colors.background,
        }}
        visible={snackBarVisible}
        onDismiss={() => setSnackBarVisible(false)}
        action={{
          label: 'OKAY',
          onPress: () => {
            setSnackBarVisible(false);
          },
        }}>
        <Text>Added To Cart</Text>
      </Snackbar>
    </React.Fragment>
  );
};

export default Search;
