import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Paragraph, Title, Button, Chip} from 'react-native-paper';
import categories from '../../constants/categories';
import routes from '../../constants/routes';

type Props = {
  product: any;
  openCartModal: any;
};

/**
 * Component responsible for displaying singular products in general.
 * Can be used to interact with like viewing the product or adding to cart.
 * @param product Product object.
 */
const ProductCardComponent: React.FC<Props> = ({product, openCartModal}) => {
  // Destructuring theme hook for colours.
  const {colors} = useTheme();

  // Navigation hook.
  const navigation = useNavigation<any>();

  /**
   * On Click function to route the user to the product page.
   */
  const navigateToProductPage = () =>
    navigation.navigate(routes.pages.single_product_page, {id: product.id});

  return (
    <Card onPress={navigateToProductPage} style={styles.cardView}>
      <Card.Cover source={{uri: product.imgLinks[0]}} />
      <Card.Content>
        <Title>{product.title}</Title>
        <Paragraph>{product.description.substring(0, 45)}...</Paragraph>
        <View style={styles.chipView}>
          {product.categories
            .map((p) => categories.find((c) => c.key === p))
            .map((p) => (
              <Chip key={p.key} style={styles.chipStyle} mode="outlined">
                {p.text}
              </Chip>
            ))}
        </View>
        <View style={styles.pricingTextView}>
          <Title>Pricing: </Title>
          <Title
            style={{
              color: colors.primary,
              ...styles.pricingText,
              borderColor: colors.primary,
            }}>
            ${product.cost}
          </Title>
        </View>
      </Card.Content>
      <Card.Actions>
        <View style={styles.buttonView}>
          <Button onPress={() => openCartModal(product.id)}>Add To Cart</Button>
          <Button onPress={navigateToProductPage}>View Product</Button>
        </View>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardView: {
    margin: 20,
  },

  buttonView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  pricingText: {
    padding: 10,
    borderWidth: 2,
  },

  pricingTextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  chipView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 5,
  },

  chipStyle: {
    margin: 2,
  },
});

export default ProductCardComponent;
