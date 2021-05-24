import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import uuid from 'uuid-random';
import * as ReviewUtils from './reviews';

const firestoreDb = firestore();
const productsDb = firestoreDb.collection('products');

export const fetchProducts = () => {
  return productsDb.orderBy('timestamp', 'desc').limit(5);
};

export const fetchUserProducts = (id) => {
  return productsDb.where('userId', '==', id);
};

export const convertToProducts = (firestoreProducts) => {
  const products = firestoreProducts.docs.map((product) => {
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

  return products;
};

export const deleteProduct = async (id) => {
  await productsDb.doc(id).delete();
  await ReviewUtils.deleteAllReviews(id);
};

export const addProduct = async (
  userId,
  title,
  description,
  cost,
  localImgLinks,
  categories,
  timestamp,
) => {
  const firebaseLinks = [];
  const productId = productsDb.doc().id;

  for (let index = 0; index < localImgLinks.length; index++) {
    const localImgLink = localImgLinks[index];

    const uuid_ = uuid();
    const path = `products/${uuid_}`;

    await storage().ref(path).putFile(localImgLink);
    const imgLink = await storage().ref(path).getDownloadURL();

    firebaseLinks.push(imgLink);
  }

  const product = {
    userId: userId,
    title: title,
    description: description,
    cost: cost,
    imgLinks: firebaseLinks,
    categories: categories,
    timestamp: timestamp,
  };

  await productsDb.doc(productId).set(product);
  await ReviewUtils.createEmptyReviews(productId);
};

export const updateProduct = async (
  id,
  title,
  description,
  cost,
  categories,
  imgLinks,
) => {
  const firebaseLinks = [];
  for (let index = 0; index < imgLinks.length; index++) {
    let imgLink = imgLinks[index];
    if (!imgLink.startsWith('https://')) {
      imgLink = await uploadImage(imgLink);
    }
    firebaseLinks.push(imgLink);
  }

  const product = {
    title: title,
    description: description,
    cost: cost,
    categories: categories,
    imgLinks: imgLinks,
  };

  await productsDb.doc(id).update(product);
};

const uploadImage = async (localImgLink) => {
  const uuid_ = uuid();
  const path = `products/${uuid_}`;

  await storage().ref(path).putFile(localImgLink);
  const imgLink = await storage().ref(path).getDownloadURL();

  return imgLink;
};
