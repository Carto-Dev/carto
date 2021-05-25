import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {
  Button,
  Portal,
  Modal,
  Surface,
  Title,
  Headline,
} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import {FlatList} from 'react-native';

/**
 * Component which displays the image and also helps
 * in interaction like updating and deleting the image
 * @param uri
 * @param onUpdate
 * @param onDelete
 */
const ImageComponent = ({uri, onUpdate, onDelete}) => {
  return (
    <View style={styles.imageView}>
      <Image style={styles.image} source={{uri: uri}} />
      <View style={styles.buttonView}>
        <Button onPress={onUpdate} mode="text" icon="pencil-outline">
          Replace
        </Button>
        <Button onPress={onDelete} mode="text" icon="trash-can-outline">
          Delete
        </Button>
      </View>
    </View>
  );
};

/**
 * Component which enables the user to capture images from
 * both camera and also from the device storage.
 * Also helps in replacing and deleting images.
 * @param addImages Function to save images in state.
 * @param addNewImage Function to save a new image in state.
 * @param replaceImage Function to replace the image in state.
 * @param deleteImage Function to delete the image in state.
 * @param visible State to whether display the modal or not.
 * @param onDismiss Function for the modal to be dismissed.
 * @param imageUris Array state which holds all the image URIs.
 */
export const ImageModalComponent = ({
  addImages,
  addNewImage,
  replaceImage,
  deleteImage,
  visible,
  onDismiss,
  imageUris,
}) => {
  /**
   * Function which lets the user to pick images
   * from the device storage.
   */
  const selectPictureFromStorage = () => {
    // Calling the Image Picker for selecting images.
    // Selecting multiple images is supported
    ImagePicker.openPicker({
      multiple: true,
    }).then((images) => {
      // Mapping the file object to just file URIs
      const newImages = images.map((image) => image.path);

      // Saving all images in state.
      addImages(newImages);
    });
  };

  /**
   * Function which lets the user to
   * open up the camera and take a picture
   */
  const selectPictureFromCamera = () => {
    // Opening the camera and enabling
    // the user to take a picture
    ImagePicker.openCamera({
      height: 500,
      width: 500,
      cropping: false,
    })
      .then((image) => {
        // Save image to the state.
        addNewImage(image.path);
      })
      .catch((error) => console.log(error));
  };

  /**
   * Letting the user to update the image from storage
   * @param oldImageUri Old Image URI
   */
  const updatePictureFromStorage = (oldImageUri) => {
    // Calling the Image Picker for selecting images.
    ImagePicker.openPicker({
      multiple: false,
    }).then((image) => {
      // Replacing the image in state.
      replaceImage(oldImageUri, image.path);
    });
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss}>
        <Surface style={styles.rootView}>
          <View style={styles.imagesView}>
            <Title>Images</Title>
            {imageUris.length !== 0 ? (
              <FlatList
                centerContent={true}
                style={styles.listView}
                data={imageUris}
                keyExtractor={(image) => image}
                renderItem={(image) => {
                  return (
                    <ImageComponent
                      uri={image.item}
                      onDelete={() => deleteImage(image.item)}
                      onUpdate={() => updatePictureFromStorage(image.item)}
                    />
                  );
                }}
              />
            ) : (
              <Headline>No Images To Display</Headline>
            )}
          </View>
          <View style={styles.selectButtonsView}>
            <Button
              icon="folder"
              style={styles.selectButton}
              mode="outlined"
              onPress={selectPictureFromStorage}>
              Select Images From Storage
            </Button>
            <Button
              icon="camera"
              style={styles.selectButton}
              mode="outlined"
              onPress={selectPictureFromCamera}>
              Select Images From Camera
            </Button>
          </View>
        </Surface>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  rootView: {
    padding: 10,
    margin: 20,
    minWidth: 350,
    minHeight: 350,
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagesView: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageView: {
    margin: 10,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  listView: {
    maxHeight: 400,
    width: 300,
  },
  image: {
    height: 200,
    width: 300,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectButtonsView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    margin: 10,
  },
  selectButton: {
    margin: 10,
  },
});
