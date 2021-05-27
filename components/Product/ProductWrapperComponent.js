import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, Image, Dimensions} from 'react-native';
import {Chip, Headline, List, Text, Title, useTheme} from 'react-native-paper';
import categories from '../../constants/categories';
import LoadingAnimation from '../Lottie/LoadingAnimation';
import ExpandableTextComponent from '../Utility/ExpandableText';
import * as ProductUtils from './../../utils/products';

/**
 * Display Specific Product Details.
 * @param id Product ID
 */
const ProductWrapperComponent = ({id}) => {
  // Loading State
  const [loading, setLoading] = useState(true);

  // Product State.
  const [product, setProduct] = useState({});

  // Destructuring theme hook for colours.
  const {colors} = useTheme();

  // Width Dimension
  const width = Dimensions.get('screen').width * 0.9;

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
        </View>
      ) : (
        <LoadingAnimation message="Fetching Product Details For You!" />
      )}
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
    fontWeight: 'bold',
  },
  titleText: {
    padding: 10,
    borderWidth: 2,
  },
  titleTextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
});

export default ProductWrapperComponent;
