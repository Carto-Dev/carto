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
import {FlatList} from 'react-native-gesture-handler';

const ImageComponent = (props) => {
  return (
    <View style={styles.imageView}>
      <Image style={styles.image} source={{uri: props.uri}} />
      <View style={styles.buttonView}>
        <Button onPress={props.onUpdate} mode="text" icon="pencil-outline">
          Replace
        </Button>
        <Button onPress={props.onDelete} mode="text" icon="trash-can-outline">
          Delete
        </Button>
      </View>
    </View>
  );
};

export const ImageModalComponent = (props) => {
  const selectPictureFromStorage = () => {
    ImagePicker.openPicker({
      multiple: true,
    }).then((images) => {
      const newImages = images.map((image) => image.path);
      props.addImages(newImages);
    });
  };

  const selectPictureFromCamera = () => {
    ImagePicker.openCamera({
      height: 500,
      width: 500,
      cropping: false,
    })
      .then((image) => {
        props.addNewImage(image.path);
      })
      .catch((error) => console.log(error));
  };

  const updatePictureFromStorage = (oldImageUri) => {
    ImagePicker.openPicker({
      multiple: false,
    }).then((image) => {
      props.replaceImage(oldImageUri, image.path);
    });
  };

  return (
    <Portal>
      <Modal visible={props.visible} onDismiss={props.onDismiss}>
        <Surface style={styles.rootView}>
          <View style={styles.imagesView}>
            <Title>Images</Title>
            {props.imageUris.length !== 0 ? (
              <FlatList
                centerContent={true}
                style={styles.listView}
                data={props.imageUris}
                keyExtractor={(image) => image}
                renderItem={(image) => {
                  return (
                    <ImageComponent
                      uri={image.item}
                      onDelete={() => props.deleteImage(image.item)}
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
