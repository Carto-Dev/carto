import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import uuid from 'uuid-random';

const firestoreDb = firestore();
const productsDb = firestoreDb.collection('products');
const reviewsDb = firestoreDb.collection('reviews');

export const fetchProducts = () => {
  return productsDb;
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

  await productsDb.add(product);
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
      console.log(imgLink);
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
