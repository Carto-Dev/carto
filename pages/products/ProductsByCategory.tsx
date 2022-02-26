import {Dimensions, StyleSheet} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {CompositeScreenProps} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeDrawerParamList} from '../../types/home-drawer.type';
import {ProductsStackParamList} from '../../types/products-stack.type';
import React, {useEffect, useState} from 'react';
import {ProductModel} from '../../models/product.model';
import * as productsService from './../../services/products.service';
import * as cartService from './../../services/cart.service';
import EmptyDataAnimation from '../../components/Lottie/EmptyDataAnimation';
import LoadingAnimation from '../../components/Lottie/LoadingAnimation';
import {FlatList} from 'react-native-gesture-handler';
import ProductCardComponent from '../../components/Products/ProductCard';
import CategoriesFilter from '../../components/Products/CategoriesFilter';
import {CartItemModel} from '../../models/cart-item.model';
import CartFormComponent from '../../components/Cart/CartFormComponent';
import {Snackbar, Text, useTheme} from 'react-native-paper';

type Props = CompositeScreenProps<
  StackScreenProps<ProductsStackParamList, 'ProductsByCategory'>,
  DrawerScreenProps<HomeDrawerParamList>
>;

const ProductsByCategoryPage: React.FC<Props> = ({route, navigation}) => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categoryKey, setCategoryKey] = useState<string>();
  const [productId, setProductId] = useState<number>(0);
  // Modal Visibility
  const [visible, setVisible] = useState(false);

  // Snackbar Visibility
  const [snackBarVisible, setSnackBarVisible] = useState(false);

  // Theme Hook.
  const theme = useTheme();

  const fetchProducts = (mounted: boolean, category: string) => {
    setCategoryKey(category);
    productsService
      .fetchProductsByCategory(category)
      .then((products) => (mounted ? setProducts(products) : null))
      .catch((error) => console.log(error))
      .finally(() => (mounted ? setLoading(false) : null));
  };

  useEffect(() => {
    let mounted = true;
    fetchProducts(mounted, route.params.category);

    return () => {
      mounted = false;
    };
  }, [route.params.category]);

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

  const switchCategory = async (cKey: string): Promise<void> => {
    fetchProducts(true, cKey);
  };

  return loading ? (
    <LoadingAnimation message="Loading products for you" />
  ) : (
    <React.Fragment>
      <FlatList
        ListHeaderComponent={
          <CategoriesFilter
            setCategory={switchCategory}
            categoryKey={categoryKey}
          />
        }
        ListEmptyComponent={
          <EmptyDataAnimation message="No Products Available. Add Some Products To Sell Today!" />
        }
        centerContent={true}
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(c) => (
          <ProductCardComponent
            product={c.item}
            openCartModal={() => openCartModal(c.item.id)}
          />
        )}
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

const styles = StyleSheet.create({
  titleView: {
    margin: Dimensions.get('screen').width * 0.04,
  },
});

export default ProductsByCategoryPage;
