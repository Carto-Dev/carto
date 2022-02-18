import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert, ScrollView} from 'react-native';
import {
  HelperText,
  TextInput,
  Button,
  Title,
  Subheading,
} from 'react-native-paper';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {ImageModalComponent} from '../../components/Utility/ImageModal';
import {LoadingModalComponent} from '../../components/Utility/LoadingModal';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MyProductsStackParamsList} from '../../types/my-products-stack.type';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {HomeDrawerParamList} from '../../types/home-drawer.type';
import CategoriesSelector from '../../components/Products/CategoriesSelector';
import {CategoryModel} from '../../models/category.model';
import * as productService from './../../services/products.service';
import {CreateProductDto} from '../../dtos/products/create-product.dto';
import {UpdateProductDto} from '../../dtos/products/update-product.dto';
import {useIsConnected} from 'react-native-offline';

type Props = CompositeScreenProps<
  NativeStackScreenProps<MyProductsStackParamsList, 'ProductForm'>,
  DrawerScreenProps<HomeDrawerParamList>
>;

const ProductFormPage: React.FC<Props> = ({navigation, route}) => {
  // Loading and error message states.
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const isConnected = useIsConnected();

  // Image State and Modal Visibility state.
  const [imageUris, setImageUris] = useState<string[]>([]);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  // Categories state and edit mode state.
  const [selectedCategories, setSelectedCategories] = useState<CategoryModel[]>(
    [],
  );

  // Prefilling the form when editing products.
  let title = '';
  let description = '';
  let cost = '';
  let id = 0;

  // If the page recieves some route params for editing products.
  if (route.params != null) {
    const receievedData = route.params;

    // Getting data from params.
    id = receievedData.product.id;
    title = receievedData.product.title;
    description = receievedData.product.description;
    cost = receievedData.product.cost.toString();
  }

  // Listen to route params to extract categories and images.
  useEffect(() => {
    let mounted = true;
    if (route.params != null && mounted) {
      const receievedData = route.params;

      setSelectedCategories(receievedData.product.categories);

      setImageUris(receievedData.product.images.map((image) => image.image));
    }

    return () => {
      mounted = false;
    };
  }, [route.params]);

  /**
   * Function to handle form submit.
   * @param values Form values
   */
  const submitForm = async (values: {
    title: string;
    description: string;
    cost: string;
  }) => {
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
        // CASE 1: To submit a new product.
        if (!route.params.edit) {
          const firebaseImages = await Promise.all(
            imageUris.map(
              async (imageUri) =>
                await productService.uploadProductImage(imageUri),
            ),
          );

          const createProductDto = new CreateProductDto();
          createProductDto.title = values.title;
          createProductDto.description = values.description;
          createProductDto.cost = Number(values.cost);
          createProductDto.imgLinks = firebaseImages;
          createProductDto.categories = selectedCategories.map(
            (category) => category.key,
          );

          await productService.createProduct(createProductDto);
        }
        // CASE 2: To update an existing product.
        else {
          const firebaseImages = await Promise.all(
            imageUris.map(async (imageUri) =>
              imageUri.startsWith('https://')
                ? imageUri
                : await productService.uploadProductImage(imageUri),
            ),
          );

          const updateProductDto = new UpdateProductDto();
          updateProductDto.id = id;
          updateProductDto.title = values.title;
          updateProductDto.description = values.description;
          updateProductDto.cost = Number(values.cost);
          updateProductDto.imgLinks = firebaseImages;
          updateProductDto.categories = selectedCategories.map(
            (category) => category.key,
          );

          await productService.updateProduct(updateProductDto);
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
   * Add or remove selected categories.
   * @param category CategoryModel
   */
  const selectACategory = (category: CategoryModel) => {
    if (selectedCategories.indexOf(category) !== -1) {
      setSelectedCategories(
        selectedCategories.filter(
          (selectedCategory) => selectedCategory.id !== category.id,
        ),
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
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

            <Subheading>Selected Categories</Subheading>
            <CategoriesSelector
              selectedCategories={selectedCategories}
              selectCategory={selectACategory}
            />

            <View style={styles.buttonView}>
              <Button
                disabled={!isConnected}
                mode="contained"
                icon="file-image"
                onPress={openImageModal}>
                Pick Images
              </Button>
              <Button
                mode="contained"
                icon={route.params.edit ? 'content-save' : 'plus'}
                disabled={isConnected ? !formik.isValid : true}
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
