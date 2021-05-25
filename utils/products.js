import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import uuid from 'uuid-random';
import * as ReviewUtils from './reviews';

const firestoreDb = firestore();
const productsDb = firestoreDb.collection('products');

/**
 * Fetch the newest 5 products from the database.
 * @returns Snapshot object of 5 new products.
 */
export const fetchProducts = () =>
  productsDb.orderBy('timestamp', 'desc').limit(5);

/**
 * Fetching the product details from firebase.
 * @param id Product ID
 * @returns Snapshot object with all product details
 */
export const fetchUserProducts = (id) => productsDb.where('userId', '==', id);

/**
 * Convert snapshot objects to product objects
 * @param firestoreProducts Snapshot data
 * @returns Array of products.
 */
export const convertToProducts = (firestoreProducts) =>
  firestoreProducts.docs.map((product) => {
    return {
      id: product.id,
      userId: product.data().userId,
      title: product.data().title,
      description: product.data().description,
      cost: product.data().cost,
      imgLinks: product.data().imgLinks,
      categories: product.data().categories,
      timestamp: product.data().timestamp,
    };
  });

/**
 * Deleting the product details as well all reviews for it.
 * @param id Product ID
 */
export const deleteProduct = async (id) => {
  await productsDb.doc(id).delete();
  await ReviewUtils.deleteAllReviews(id);
};

/**
 * Record the product into the the database.
 * @param userId User ID
 * @param title Title for the product
 * @param description Description for the product.
 * @param cost Cost for the product.
 * @param localImgLinks All the links of images for the product
 * @param categories Categories the product belongs to
 * @param timestamp Timestamp when the product was created
 */
export const addProduct = async (
  userId,
  title,
  description,
  cost,
  localImgLinks,
  categories,
  timestamp,
) => {
  // Generate a product id for the product.
  const productId = productsDb.doc().id;

  // Map the local image links to the firebase image links
  const firebaseLinks = await Promise.all(
    localImgLinks.map(async (imageLink) => uploadImage(imageLink)),
  );

  // Create the product object.
  const product = {
    userId: userId,
    title: title,
    description: description,
    cost: cost,
    imgLinks: firebaseLinks,
    categories: categories,
    timestamp: timestamp,
  };

  // Save the product to firebase and generate empty reviews document.
  await productsDb.doc(productId).set(product);
  await ReviewUtils.createEmptyReviews(productId);
};

/**
 * Update a given product in the database.
 * @param id Product ID.
 * @param title Updated/Old product title.
 * @param description Updated/Old product description.
 * @param cost Updated/Old product cost
 * @param categories Updated/Old product categories
 * @param imgLinks Updated/Old image links
 */
export const updateProduct = async (
  id,
  title,
  description,
  cost,
  categories,
  imgLinks,
) => {
  // Map the new local image links to firebase links.
  const firebaseLinks = await Promise.all(
    imgLinks.map(async (imgLink) =>
      imgLink.startsWith('https://') ? imgLink : await uploadImage(imgLink),
    ),
  );

  // Updated product object.
  const product = {
    title: title,
    description: description,
    cost: cost,
    categories: categories,
    imgLinks: firebaseLinks,
  };

  // Update the product document in firebase.
  await productsDb.doc(id).update(product);
};

/**
 * Upload the image to firebase storage.
 * @param localImgLink Local image link
 * @returns Firebase Image link
 */
const uploadImage = async (localImgLink) => {
  // Generate UUID for the image and the path
  const uuid_ = uuid();
  const path = `products/${uuid_}`;

  // Upload the image to firebase storage and generate a URL.
  await storage().ref(path).putFile(localImgLink);
  const imgLink = await storage().ref(path).getDownloadURL();

  // Return the firebase URL
  return imgLink;
};
