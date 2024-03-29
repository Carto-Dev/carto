import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import uuid from 'uuid-random';

const firestoreDb = firestore();
const cartDb = firestoreDb.collection('cart');
const productsDb = firestoreDb.collection('products');
const firebaseAuth = auth();

/**
 * Fetch cart products in real time.
 * @returns Snapshot object of product details and quantity
 */
export const fetchProductsFromCart =
  (): FirebaseFirestoreTypes.DocumentReference =>
    cartDb.doc(firebaseAuth.currentUser.uid);

/**
 * Fetch actal product from products collection.
 * @param productId Product ID
 * @returns Product details
 */
export const fetchActualProduct = async (
  productId,
): Promise<FirebaseFirestoreTypes.DocumentData> => {
  // Fetch document reference from products collection.
  const productDocument = await productsDb.doc(productId).get();

  // Return data.
  return await productDocument.data();
};

/**
 * Add product to the user cart document.
 * @param productId Product ID.
 * @param quantity Quantity of product in cart.
 */
export const addProductToCart = async (
  productId: string,
  quantity: number,
): Promise<void> => {
  // User Cart Document Reference.
  const userCartDocument = await cartDb.doc(firebaseAuth.currentUser.uid).get();

  // If the document exists, append product id and quantity to it.
  if (userCartDocument.exists) {
    const products = (await userCartDocument.data()).products;

    products.push({id: uuid(), productId, quantity});
    await cartDb.doc(firebaseAuth.currentUser.uid).set({products});
  }
  // Else create a new list and add the list to the document.
  else {
    const products = [{id: uuid(), productId, quantity}];
    await cartDb.doc(firebaseAuth.currentUser.uid).set({products});
  }
};

/**
 * Update product with quantity.
 * @param productId Product ID
 * @param quantity Product Quantity.
 */
export const updateProductInCart = async (
  id: string,
  quantity: number,
): Promise<void> => {
  // Document reference
  const userCartDocument = await cartDb.doc(firebaseAuth.currentUser.uid).get();

  // Fetch the product from the document.
  const products = (await userCartDocument.data()).products;
  const product = products.find((p) => p.id === id);

  // Update the quantity and save the array in firebase.
  product.quantity = quantity;

  // Update the document in firebase.
  await cartDb.doc(firebaseAuth.currentUser.uid).set({products: products});
};

/**
 * Delete product from the cart.
 * @param productId Product ID
 */
export const deleteProductFromCart = async (id: string): Promise<void> => {
  console.log(id);
  // Document reference
  const userCartDocument = await cartDb.doc(firebaseAuth.currentUser.uid).get();

  // Remove the product from array
  const products = (await userCartDocument.data()).products;
  const updatedProducts = products.filter((p) => p.id !== id);

  // Update the document in firebase.
  await cartDb
    .doc(firebaseAuth.currentUser.uid)
    .set({products: updatedProducts});
};
