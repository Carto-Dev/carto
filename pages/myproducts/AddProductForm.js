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
import {useDispatch} from 'react-redux';
import {useFormik} from 'formik';
import {ImageModalComponent} from '../../components/ImageModal';
import * as ProductActions from '../../store/actions/products';
import {useSelector} from 'react-redux';
import {LoadingModalComponent} from '../../components/LoadingModal';
import categories from '../../constants/categories';

const AddProductFormPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [imageUris, setImageUris] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const Auth = useSelector((state) => state.auth);

  const submitForm = async (values) => {
    setLoading(true);
    try {
      if (imageUris.length === 0) {
        throw new Error('No images inserted');
      } else if (selectedCategories.length === 0) {
        throw new Error('No categories selected');
      } else {
        const userId = Auth.uid;
        const product = {
          userId: userId,
          title: values.title,
          description: values.description,
          cost: values.cost,
          localImgLinks: imageUris,
          categories: selectedCategories.map((c) => c.key),
          timestamp: new Date().toUTCString(),
        };

        await dispatch(
          ProductActions.addProduct(
            product.userId,
            product.title,
            product.description,
            product.cost,
            product.localImgLinks,
            product.categories,
            product.timestamp,
          ),
        );
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      cost: '',
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

  const addCategory = (category) => {
    if (selectedCategories.indexOf(category) !== -1) {
      return;
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const removeCategory = (category) => {
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
            <Title>Add A New Product</Title>
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
              visible={formik.touched.title && formik.errors.title}>
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
              visible={formik.touched.description && formik.errors.description}>
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
              visible={formik.touched.cost && formik.errors.cost}>
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
                icon="plus"
                disabled={!formik.isValid}
                onPress={formik.handleSubmit}>
                Add new product
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
      <LoadingModalComponent visible={isLoading} />
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

export default AddProductFormPage;
