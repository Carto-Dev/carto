import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import uuid from 'uuid-random';

export const GET_ALL_PRODUCTS = 'GET ALL PRODUCTS';
export const GET_USER_PRODUCTS = 'GET USER PRODUCTS';
export const CREATE_PRODUCT = 'CREATE PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE PRODUCT';
export const DELETE_PRODUCT = 'DELETE PRODUCT';

const firestore_ = firestore();

// firestore_.settings({host: 'localhost:8080', ssl: true});

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

      console.log(path);

      await storage().ref(path).putFile(localImgLink);
      const imgLink = await storage().ref(path).getDownloadURL();

      console.log(imgLink);

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

    console.log(product);

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

export const updateProduct = (id, title, description, cost) => {
  return async (dispatch) => {
    const product = {
      title: title,
      description: description,
      cost: cost,
    };

    const document = await firestoreDB.doc(id).update(product);
    product.id = (await document.get()).id;

    dispatch({
      type: UPDATE_PRODUCT,
      payload: {
        id: id,
        product: product,
      },
    });
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
