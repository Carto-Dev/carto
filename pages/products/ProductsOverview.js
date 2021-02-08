import React from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  FlatList,
  ScrollView,
} from 'react-native';
import {Title, TextInput, Headline} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import * as AuthActions from '../../store/actions/auth';
import * as ProductActions from '../../store/actions/products';
import categories from '../../constants/categories';
import {useTheme} from 'react-native-paper';

const ProductsOverviewPage = (props) => {
  const auth = useSelector((state) => state.auth);
  const theme = useTheme();
  const dispatch = useDispatch();

  dispatch(ProductActions.getAllProducts());

  const onSignOutButtonPressed = () => {
    dispatch(AuthActions.logout());
  };

  const items = [
    {
      title: 'title',
      img: categories[0].img,
    },
    {
      title: 'title',
      img: categories[0].img,
    },
    {
      title: 'title',
      img: categories[0].img,
    },
    {
      title: 'title',
      img: categories[0].img,
    },
  ];

  return (
    <View style={styles.rootView}>
      <ScrollView>
        <View style={styles.marginView}>
          <Title>
            <Headline>Good Morning!</Headline>
          </Title>
          <TextInput
            left={<TextInput.Icon name="magnify" />}
            mode="outlined"
            label="Search"
            autoCapitalize="none"
            keyboardType="default"
          />
        </View>
        <View style={styles.marginView}>
          <Title>Categories</Title>
        </View>
        <View>
          <FlatList
            style={{backgroundColor: theme.colors.surface}}
            centerContent={true}
            data={categories}
            keyExtractor={(category) => category.key}
            horizontal={true}
            renderItem={(c) => {
              return (
                <View style={styles.imageView}>
                  <ImageBackground
                    imageStyle={styles.images}
                    style={styles.image}
                    source={c.item.img}>
                    <View style={styles.imageTextView}>
                      <Title style={styles.text}>{c.item.text}</Title>
                    </View>
                  </ImageBackground>
                </View>
              );
            }}
          />
        </View>
        <View style={styles.marginView}>
          <FlatList
            centerContent={true}
            data={items}
            keyExtractor={(item) => items.indexOf(item)}
            numColumns={2}
            renderItem={(c) => {
              return (
                <View style={styles.productView}>
                  <Image
                    style={{height: 150, width: 150}}
                    source={c.item.img}
                  />
                  <Title>{c.item.title}</Title>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
  marginView: {
    margin: 20,
  },
  productView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageView: {
    width: 300,
    height: 200,
    padding: 10,
  },
  images: {
    borderRadius: 30,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000000',
  },
  imageTextView: {
    backgroundColor: '#000000a0',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  text: {
    textAlign: 'center',
  },
});

export default ProductsOverviewPage;
