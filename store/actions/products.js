import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import uuid from 'uuid-random';

export const GET_ALL_PRODUCTS = 'GET ALL PRODUCTS';
export const GET_USER_PRODUCTS = 'GET USER PRODUCTS';
export const CREATE_PRODUCT = 'CREATE PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE PRODUCT';
export const DELETE_PRODUCT = 'DELETE PRODUCT';

const firestore_ = firestore();

const firestoreDB = firestore_.collection('products');

export const fetchAllProducts = (firestoreProducts) => {
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

  return {
    type: GET_ALL_PRODUCTS,
    payload: {
      products: products,
    },
  };
};

export const fetchUserProducts = (firestoreProducts) => {
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

  return {
    type: GET_USER_PRODUCTS,
    payload: {
      products: products,
    },
  };
};

export const addProduct = (
  userId,
  title,
  description,
  cost,
  localImgLinks,
  categories,
  timestamp,
) => {
  return async (dispatch) => {
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

    const document = await firestoreDB.add(product);
    product.id = (await document.get()).id;

    dispatch({
      type: CREATE_PRODUCT,
      payload: {
        product: product,
      },
    });
  };
};

export const updateProduct = (
  id,
  title,
  description,
  cost,
  categories,
  imgLinks,
) => {
  return async (dispatch) => {
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

    await firestoreDB.doc(id).update(product);
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    await firestoreDB.doc(id).delete();

    dispatch({
      type: DELETE_PRODUCT,
      payload: {
        id: id,
      },
    });
  };
};

const uploadImage = async (localImgLink) => {
  const uuid_ = uuid();
  const path = `products/${uuid_}`;

  await storage().ref(path).putFile(localImgLink);
  const imgLink = await storage().ref(path).getDownloadURL();

  return imgLink;
};
