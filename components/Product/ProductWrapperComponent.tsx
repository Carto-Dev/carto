import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, Image, Dimensions} from 'react-native';
import {
  Button,
  Chip,
  Headline,
  Modal,
  Portal,
  Snackbar,
  Text,
  TextInput,
  Title,
  useTheme,
} from 'react-native-paper';
import categories from '../../constants/categories';
import LoadingAnimation from '../Lottie/LoadingAnimation';
import ExpandableTextComponent from '../Utility/ExpandableText';
import * as ProductUtils from '../../utils/products';
import * as CartUtils from '../../utils/cart';

type Props = {
  id: string;
};

/**
 * Display Specific Product Details.
 * @param id Product ID
 */
const ProductWrapperComponent: React.FC<Props> = ({id}) => {
  // Loading State
  const [loading, setLoading] = useState(true);

  // Product State.
  const [product, setProduct] = useState<any>({});

  // Destructuring theme hook for colours.
  const {colors} = useTheme();

  // Width Dimension
  const width = Dimensions.get('screen').width * 0.9;

  // Theme Hook.
  const theme = useTheme();

  // Snackbar Visibility
  const [snackBarVisible, setSnackBarVisible] = useState(false);

  // Modal Visibility
  const [visible, setVisible] = useState(false);

  // Quantity state.
  const [quantity, setQuantity] = useState('1');

  /**
   * Add to cart function.
   */
  const addToCart = async () => {
    await CartUtils.addProductToCart(product.id, Number(quantity));
    setVisible(false);
    setSnackBarVisible(true);
  };

  // Listening to product changes and reflecting the same.
  useEffect(
    () =>
      ProductUtils.fetchProduct(id).onSnapshot(
        (data) => {
          setProduct(data.data());
          setLoading(false);
        },
        (error) => console.log(error),
      ),
    [],
  );

  return (
    <React.Fragment>
      {!loading ? (
        <View style={styles.mainView}>
          <FlatList
            pagingEnabled={true}
            horizontal={true}
            centerContent={true}
            data={product.imgLinks}
            keyExtractor={(imgLink) => imgLink}
            renderItem={(imgLink) => (
              <Image
                style={{height: 250, width: width}}
                source={{uri: imgLink.item}}
              />
            )}
          />
          <View style={styles.titleTextView}>
            <Title>{product.title}</Title>
            <Title
              style={{
                color: colors.primary,
                ...styles.titleText,
                borderColor: colors.primary,
              }}>
              ${product.cost}
            </Title>
          </View>
          <View style={styles.chipView}>
            {product.categories
              .map((p) => categories.find((c) => c.key === p))
              .map((p) => (
                <Chip key={p.key} style={styles.chipStyle} mode="outlined">
                  {p.text}
                </Chip>
              ))}
          </View>
          <Headline>Description:</Headline>
          <ExpandableTextComponent>
            {product.description}
          </ExpandableTextComponent>
          <Button
            style={styles.addToCartButtonStyle}
            mode="contained"
            onPress={() => setVisible(true)}>
            Add To Cart
          </Button>
        </View>
      ) : (
        <LoadingAnimation message="Fetching Product Details For You!" />
      )}
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          dismissable
          style={styles.modalView}
          contentContainerStyle={{
            ...styles.modalContainer,
            backgroundColor: theme.colors.background,
          }}>
          <View style={styles.mainModalView}>
            <Title>Select The Quantity Of Products To Add In Cart</Title>
            <TextInput
              label="Quantity"
              keyboardType="numeric"
              value={quantity}
              mode="outlined"
              onChangeText={(text) => setQuantity(text)}
            />
            <Button style={styles.addToCartButtonStyle} onPress={addToCart}>
              Add To Cart
            </Button>
          </View>
        </Modal>
      </Portal>
      <Snackbar
        style={{
          backgroundColor: theme.colors.background,
        }}
        visible={snackBarVisible}
        onDismiss={() => setSnackBarVisible(false)}
        action={{
          label: 'Close',
          onPress: () => {
            setSnackBarVisible(false);
          },
        }}>
        <Text>Added To Cart!</Text>
      </Snackbar>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  mainView: {
    margin: 20,
  },
  categoryTitle: {
    marginTop: 20,
  },
  chipView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chipStyle: {
    margin: 5,
  },
  titleText: {
    padding: 10,
    borderWidth: 2,
    fontWeight: 'bold',
  },
  titleTextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  addToCartButtonStyle: {
    marginVertical: 20,
  },
  modalView: {
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContainer: {
    margin: 20,
    borderRadius: 20,
  },
  mainModalView: {
    padding: 20,
  },
});

export default ProductWrapperComponent;
