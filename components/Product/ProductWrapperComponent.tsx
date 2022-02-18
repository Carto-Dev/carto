import React, {useState} from 'react';
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
import ExpandableTextComponent from '../Utility/ExpandableText';
import {ProductModel} from '../../models/product.model';
import {useIsConnected} from 'react-native-offline';
import FastImage from 'react-native-fast-image';

type Props = {
  product: ProductModel;
};

/**
 * Display Specific Product Details.
 * @param id Product ID
 */
const ProductWrapperComponent: React.FC<Props> = ({product}) => {
  // Destructuring theme hook for colours.
  const {colors} = useTheme();

  const isConnected = useIsConnected();

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
    // await CartUtils.addProductToCart(product.id, Number(quantity));
    // setVisible(false);
    // setSnackBarVisible(true);
  };

  return (
    <React.Fragment>
      <View style={styles.mainView}>
        <FlatList
          pagingEnabled={true}
          horizontal={true}
          centerContent={true}
          data={product.images}
          keyExtractor={(image) => image.id.toString()}
          renderItem={(image) => (
            <FastImage
              style={styles.image}
              source={{
                uri: image.item.image,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
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
          {product.categories.map((p) => (
            <Chip key={p.key} style={styles.chipStyle} mode="outlined">
              {p.text}
            </Chip>
          ))}
        </View>
        <Headline>Description:</Headline>
        <ExpandableTextComponent>{product.description}</ExpandableTextComponent>
        <Button
          style={styles.addToCartButtonStyle}
          mode="contained"
          onPress={isConnected ? () => setVisible(true) : () => {}}>
          Add To Cart
        </Button>
      </View>
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
  image: {
    height: Dimensions.get('screen').height * 0.4,
    width: Dimensions.get('screen').width * 0.9,
  },
  mainView: {
    margin: Dimensions.get('screen').height * 0.03,
  },
  categoryTitle: {
    marginTop: Dimensions.get('screen').height * 0.03,
  },
  chipView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chipStyle: {
    margin: Dimensions.get('screen').height * 0.01,
  },
  titleText: {
    padding: Dimensions.get('screen').height * 0.01,
    borderWidth: 2,
    fontWeight: 'bold',
  },
  titleTextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: Dimensions.get('screen').height * 0.01,
  },
  addToCartButtonStyle: {
    marginVertical: Dimensions.get('screen').height * 0.04,
  },
  modalView: {
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContainer: {
    margin: Dimensions.get('screen').height * 0.01,
    borderRadius: 20,
  },
  mainModalView: {
    padding: Dimensions.get('screen').height * 0.04,
  },
});

export default ProductWrapperComponent;
