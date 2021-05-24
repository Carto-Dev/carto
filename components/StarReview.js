import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {Button, Card, IconButton, TextInput} from 'react-native-paper';
import {Review} from '../models/review';
import * as ReviewUtils from '../utils/reviews';
import {ImageModalComponent} from './ImageModal';
import {LoadingModalComponent} from './LoadingModal';

const StarReviewComponent = ({
  id,
  isEdit = false,
  review = new Review(),
  starsGiven = 1,
  text = '',
  imageLinks = [],
}) => {
  const [noOfStars, setNoOfStars] = useState(starsGiven);
  const [reviewText, setReviewText] = useState(text);

  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [imageUris, setImageUris] = useState(imageLinks);
  const [isModalVisible, setModalVisible] = useState(false);

  const stars = [1, 2, 3, 4, 5];
  const {colors} = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    if (errorMessage) {
      Alert.alert('Something went wrong!', errorMessage, [
        {
          text: 'Okay',
          onPress: () => {
            setErrorMessage(null);
            setLoading(false);
          },
        },
      ]);
    }
  }, [errorMessage]);

  const handleReviewSubmit = async () => {
    setLoading(true);
    try {
      if (!isEdit) {
        await ReviewUtils.submitReview(id, noOfStars, reviewText, imageUris);
      } else {
        await ReviewUtils.updateReview(
          reviewText,
          noOfStars,
          review,
          id,
          imageUris,
        );
        navigation.goBack();
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setLoading(false);
  };

  const openImageModal = () => {
    setModalVisible(true);
  };

  const closeImageModal = () => {
    setModalVisible(false);
  };

  const addNewImage = (imageUri) => setImageUris([...imageUris, imageUri]);

  const addImages = (newImageUris) => setImageUris([...newImageUris]);

  const deleteImage = (imageUri) =>
    setImageUris(imageUris.filter((uri) => uri !== imageUri));

  const replaceImage = (oldImageUri, newImageUri) => {
    const index = imageUris.indexOf(oldImageUri);
    setImageUris([
      ...imageUris.slice(0, index),
      newImageUri,
      ...imageUris.slice(index + 1, imageUris.length + 1),
    ]);
  };

  return (
    <React.Fragment>
      <Card style={styles.rootView}>
        <Card.Content style={styles.contentView}>
          {stars.map((star) => (
            <IconButton
              key={star}
              color={colors.primary}
              icon={star <= noOfStars ? 'star' : 'star-outline'}
              onPress={() => setNoOfStars(star)}
            />
          ))}
        </Card.Content>
        <Card.Content>
          <TextInput
            mode="outlined"
            label="Your Review"
            value={reviewText}
            onChangeText={(value) => setReviewText(value)}
            autoCapitalize="none"
            keyboardType="default"
          />
          <View style={styles.buttonLayout}>
            <Button mode="contained" icon="file-image" onPress={openImageModal}>
              Upload Images
            </Button>

            <Button mode="contained" icon="plus" onPress={handleReviewSubmit}>
              Submit Review
            </Button>
          </View>
        </Card.Content>
      </Card>
      <ImageModalComponent
        visible={isModalVisible}
        onDismiss={closeImageModal}
        imageUris={imageUris}
        addNewImage={addNewImage}
        addImages={addImages}
        deleteImage={deleteImage}
        replaceImage={replaceImage}
      />
      <LoadingModalComponent visible={isLoading} />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  rootView: {
    margin: 20,
  },

  contentView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  buttonLayout: {
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 100,
  },
});

export default StarReviewComponent;
