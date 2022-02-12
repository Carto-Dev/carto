import {DrawerNavigationProp} from '@react-navigation/drawer';
import {
  CompositeNavigationProp,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import {Alert, Dimensions, StyleSheet, View} from 'react-native';
import {Button, Card, IconButton, TextInput} from 'react-native-paper';
import {CreateReviewDto} from '../../dtos/reviews/create-review.dto';
import {Review} from '../../models/review';
import {HomeDrawerParamList} from '../../types/home-drawer.type';
import {ProductsStackParamList} from '../../types/products-stack.type';
import * as ReviewUtils from '../../utils/reviews';
import * as reviewService from './../../services/reviews.service';
import {ImageModalComponent} from '../Utility/ImageModal';
import {LoadingModalComponent} from '../Utility/LoadingModal';
import {UpdateReviewDto} from '../../dtos/reviews/update-review.dto';
import {ReviewModel} from '../../models/review.model';

type Props = {
  id: number;
  isEdit?: boolean;
  review?: ReviewModel;
  starsGiven?: number;
  text?: string;
  imageLinks?: string[];
};

/**
 * Review form component with stars.
 * @param id ID of the product.
 * @param isEdit if the form is in edit form.
 * @param review Review object to update
 * @param starsGiven Stars given according to the old review
 * @param text Review Text
 * @param imageLinks Links of images of the product
 */

type ReviewNavigatorType = CompositeNavigationProp<
  StackNavigationProp<ProductsStackParamList, 'Product'>,
  DrawerNavigationProp<HomeDrawerParamList>
>;

const ReviewFormComponent: React.FC<Props> = ({
  id,
  isEdit = false,
  review = new ReviewModel(),
  starsGiven = 1,
  text = '',
  imageLinks = [],
}) => {
  // State hook for stars and review text
  const [noOfStars, setNoOfStars] = useState(starsGiven);
  const [reviewText, setReviewText] = useState(text);

  // State hooks for loading and error message states
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // State hooks for image modal visibility and image array
  const [imageUris, setImageUris] = useState(imageLinks);
  const [isModalVisible, setModalVisible] = useState(false);

  // Stars possible
  const stars = [1, 2, 3, 4, 5];

  // Destructuring colors from theme hook.
  const {colors} = useTheme();

  // Navigation hooks.
  const navigation = useNavigation<ReviewNavigatorType>();

  // Listening to error message state changes
  // and displaying errors if any
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

  /**
   * Function to handle submitting review to the database.
   */
  const handleReviewSubmit = async () => {
    // Setting loading state to true.
    setLoading(true);

    if (reviewText.length < 5) {
      setErrorMessage('Your review should be at least 5 characters long.');
      return;
    }

    try {
      // CASE 1: If the user is submitting a new review.
      if (!isEdit) {
        const firebaseImages = await Promise.all(
          imageUris.map(async (localImageUri) =>
            reviewService.uploadReviewImage(localImageUri),
          ),
        );

        const createReviewDto = CreateReviewDto.newDto(
          id,
          reviewText,
          noOfStars,
          firebaseImages,
        );

        await reviewService.createReview(createReviewDto);
      }
      // CASE 2: If the user is updating their review.
      else {
        const firebaseImages = await Promise.all(
          imageUris.map(async (imageUri) =>
            imageUri.startsWith('https://')
              ? imageUri
              : reviewService.uploadReviewImage(imageUri),
          ),
        );

        const updateReviewDto = UpdateReviewDto.newDto(
          review.id,
          reviewText,
          noOfStars,
          firebaseImages,
        );

        await reviewService.updateReview(updateReviewDto);

        // Go back to the previous screen.
        navigation.goBack();
      }
    } catch (error) {
      // Set error state in case of any errors
      setErrorMessage(error.message);
    }

    // Set loading state as false.
    setLoading(false);
  };

  /**
   * To open the image modal
   */
  const openImageModal = () => {
    setModalVisible(true);
  };

  /**
   * To close the image modal
   */
  const closeImageModal = () => {
    setModalVisible(false);
  };

  /**
   * Add a new image URI to the image URI array.
   * @param imageUri Device URI of the image
   */
  const addNewImage = (imageUri: string) =>
    setImageUris([...imageUris, imageUri]);

  /**
   * Save multiple new image URIs to the image URI array.
   * @param imageUri list of device URIs of the images
   */
  const addImages = (newImageUris: string[]) => setImageUris([...newImageUris]);

  /**
   * To remove a specific image URI
   * @param imageUri Image URI to remove
   */
  const deleteImage = (imageUri: string) =>
    setImageUris(imageUris.filter((uri) => uri !== imageUri));

  /**
   * To replace a specific image URI
   * @param oldImageUri Image URI to remove
   * @param newImageUri Image URI to replace
   */
  const replaceImage = (oldImageUri: string, newImageUri: string) => {
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
      <LoadingModalComponent
        message={isEdit ? 'Editing Your Review!' : 'Submitting Your Review!'}
        visible={isLoading}
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  rootView: {
    margin: Dimensions.get('screen').height * 0.03,
  },

  contentView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  buttonLayout: {
    marginTop: Dimensions.get('screen').height * 0.01,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: Dimensions.get('screen').height * 0.15,
  },
});

export default ReviewFormComponent;
