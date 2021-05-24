import React from 'react';
import {View, ImageBackground, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';

/**
 * Component for displaying the App Header in the drawer.
 */
const HeaderDrawerSectionComponent = () => {
  return (
    <View style={styles.imageView}>
      <ImageBackground
        style={styles.image}
        source={{uri: 'https://picsum.photos/200/300'}}>
        <View style={styles.imageTextView}>
          <Title style={styles.text}>Carto</Title>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  imageView: {
    height: 200,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTextView: {
    backgroundColor: '#000000a0',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
});

export default HeaderDrawerSectionComponent;
