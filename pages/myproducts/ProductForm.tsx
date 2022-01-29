import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert, ScrollView} from 'react-native';
import {
  HelperText,
  TextInput,
  Button,
  Title,
  List,
  Subheading,
  Chip,
} from 'react-native-paper';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {ImageModalComponent} from '../../components/Utility/ImageModal';
import {LoadingModalComponent} from '../../components/Utility/LoadingModal';
import categories from '../../constants/categories';
import * as ProductUtils from '../../utils/products';
import * as AuthUtils from '../../utils/auth';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MyProductsStackParamsList} from '../../types/my-products-stack.type';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {HomeDrawerParamList} from '../../types/home-drawer.type';

type Props = CompositeScreenProps<
  NativeStackScreenProps<MyProductsStackParamsList, 'ProductForm'>,
  DrawerScreenProps<HomeDrawerParamList>
>;

const ProductFormPage: React.FC<Props> = ({navigation, route}) => {
  // Loading and error message states.
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Image State and Modal Visibility state.
  const [imageUris, setImageUris] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  // Categories state and edit mode state.
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Prefilling the form when editing products.
  let title = '';
  let description = '';
  let cost = '';
  let id = '';

  // If the page recieves some route params for editing products.
  if (route.params != null) {
    const receievedData = route.params;

    // Getting data from params.
    id = receievedData.id;
    title = receievedData.title;
    description = receievedData.description;
    cost = receievedData.cost.toString();
  }

  // Listen to route params to extract categories and images.
  useEffect(() => {
    if (route.params != null) {
      const receievedData = route.params;

      const categoriesMapped = receievedData.categories.map((category) =>
        categories.find((c) => c.key === category),
      );

      setImageUris(receievedData.imageUris);
      setSelectedCategories(categoriesMapped);
    }
  }, [route.params]);

  /**
   * Function to handle form submit.
   * @param values Form values
   */
  const submitForm = async (values) => {
    // Set loading state as true.
    setLoading(true);
    try {
      // Check if the images array is not empty.
      if (imageUris.length === 0) {
        throw new Error('No images inserted');
      }
      // Check if the categories array is not empty.
      else if (selectedCategories.length === 0) {
        throw new Error('No categories selected');
      }
      // Submit data to firebase
      else {
        // Create the product object.
        const user = AuthUtils.currentUser();
        const product = {
          userId: user.uid,
          title: values.title,
          description: values.description,
          cost: values.cost,
          localImgLinks: imageUris,
          categories: selectedCategories.map((c) => c.key),
          timestamp: new Date().toUTCString(),
        };

        // CASE 1: To submit a new product.
        if (!route.params.edit) {
          await ProductUtils.addProduct(
            product.userId,
            product.title,
            product.description,
            product.cost,
            product.localImgLinks,
            product.categories,
            product.timestamp,
          );
        }
        // CASE 1: To update an existing product.
        else {
          await ProductUtils.updateProduct(
            id,
            product.title,
            product.description,
            product.cost,
            product.categories,
            product.localImgLinks,
          );
        }

        // Route back to your products page.
        navigation.navigate('MyProductsOverview');
      }
    } catch (error) {
      // Set the error message state if there's any error.
      setErrorMessage(error.message);
    }

    // Set loading state as false.
    setLoading(false);
  };

  // Formik Hook
  const formik = useFormik({
    initialValues: {
      title: title,
      description: description,
      cost: cost,
    },
    onSubmit: submitForm,
    validationSchema: yup.object().shape({
      title: yup.string().required(),
      description: yup.string().required().min(200),
      cost: yup
        .string()
        .required()
        .matches(
          /^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$/,
          {excludeEmptyString: true, message: 'Please enter a correct amount'},
        ),
    }),
  });

  // Listening for error message state changes.
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
   * Open the image modal
   */
  const openImageModal = () => {
    setModalVisible(true);
  };

  /**
   * Close the image modal
   */
  const closeImageModal = () => {
    setModalVisible(false);
  };

  /**
   * Add image to the image state array
   */
  const addNewImage = (imageUri: string) =>
    setImageUris([...imageUris, imageUri]);

  /**
   * Add multiple images to the image state array
   */
  const addImages = (newImageUris: string[]) => setImageUris([...newImageUris]);

  /**
   * Remove image from the image state array
   */
  const deleteImage = (imageUri: string) =>
    setImageUris(imageUris.filter((uri) => uri !== imageUri));

  /**
   * Replace image in the image state array
   */
  const replaceImage = (oldImageUri: string, newImageUri: string) => {
    const index = imageUris.indexOf(oldImageUri);
    setImageUris([
      ...imageUris.slice(0, index),
      newImageUri,
      ...imageUris.slice(index + 1, imageUris.length + 1),
    ]);
  };

  /**
   * Add categories to the category state.
   */
  const addCategory = (category: {text: string; key: string; img: any}) => {
    if (selectedCategories.indexOf(category) !== -1) {
      return;
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  /**
   * Remove categories from the category state.
   */
  const removeCategory = (category: {text: string; key: string; img: any}) => {
    if (selectedCategories.indexOf(category) === -1) {
      return;
    } else {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category),
      );
    }
  };

  return (
    <View style={styles.rootView}>
      <View style={styles.formView}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.mainView}>
            <Title>
              {route.params.edit ? 'Edit Product Details' : 'Add A New Product'}
            </Title>
            <TextInput
              mode="outlined"
              label="Title"
              value={formik.values.title}
              onChangeText={formik.handleChange('title')}
              onBlur={() => formik.setFieldTouched('title')}
              autoCapitalize="none"
              keyboardType="default"
            />
            <HelperText
              type="error"
              visible={
                formik.touched.title && (formik.errors.title ? true : false)
              }>
              {formik.errors.title}
            </HelperText>
            <TextInput
              mode="outlined"
              label="Description"
              multiline={true}
              numberOfLines={10}
              value={formik.values.description}
              onChangeText={formik.handleChange('description')}
              onBlur={() => formik.setFieldTouched('description')}
              autoCapitalize="none"
              keyboardType="default"
            />
            <HelperText
              type="error"
              visible={
                formik.touched.description &&
                (formik.errors.description ? true : false)
              }>
              {formik.errors.description}
            </HelperText>
            <TextInput
              mode="outlined"
              label="Cost of the item"
              value={formik.values.cost}
              onChangeText={formik.handleChange('cost')}
              onBlur={() => formik.setFieldTouched('cost')}
              autoCapitalize="none"
              keyboardType="numbers-and-punctuation"
            />
            <HelperText
              type="error"
              visible={
                formik.touched.cost && (formik.errors.cost ? true : false)
              }>
              {formik.errors.cost}
            </HelperText>
            <List.Accordion
              title="Select Categories"
              left={(props) => (
                <List.Icon {...props} icon="format-list-checks" />
              )}>
              {categories.map((category, index) => (
                <List.Item
                  key={index}
                  title={category.text}
                  onPress={() => addCategory(category)}
                />
              ))}
            </List.Accordion>

            <Subheading>Selected Categories</Subheading>
            <View style={styles.categoryView}>
              {selectedCategories.length > 0 ? (
                selectedCategories.map((category, index) => (
                  <Chip
                    style={styles.category}
                    mode="outlined"
                    key={index}
                    onPress={() => removeCategory(category)}>
                    {category.text}
                  </Chip>
                ))
              ) : (
                <Chip style={styles.category} mode="outlined">
                  No Categories Selected
                </Chip>
              )}
            </View>

            <View style={styles.buttonView}>
              <Button
                mode="contained"
                icon="file-image"
                onPress={openImageModal}>
                Pick Images
              </Button>
              <Button
                mode="contained"
                icon={route.params.edit ? 'content-save' : 'plus'}
                disabled={!formik.isValid}
                onPress={formik.handleSubmit}>
                {route.params.edit ? 'Save Changes' : 'Add New Product'}
              </Button>
            </View>
          </View>
        </ScrollView>
      </View>
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
        message={
          route.params.edit
            ? 'Updating Your Product Details!'
            : 'Making Your Product Available To Buy!'
        }
        visible={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  formView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    elevation: 4,
  },
  buttonView: {
    margin: 10,
    padding: 10,
    height: 100,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
  },
  mainView: {
    padding: 20,
  },
  categoryView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  category: {
    alignSelf: 'flex-start',
    margin: 5,
  },
});

export default ProductFormPage;
