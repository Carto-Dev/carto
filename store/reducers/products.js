import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_USER_PRODUCTS,
  UPDATE_PRODUCT,
} from './../actions/products.js';

const initialState = {
  products: [],
  userProducts: [],
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS: {
      const payload = action.payload;

      return {
        ...state,
        products: payload.products,
      };
    }

    case GET_USER_PRODUCTS: {
      const payload = action.payload;

      return {
        ...state,
        userProducts: payload.products,
      };
    }

    case CREATE_PRODUCT: {
      const payload = action.payload;

      return {
        ...state,
        products: [...state.products, payload.product],
        userProducts: [...state.userProducts, payload.product],
      };
    }

    case UPDATE_PRODUCT: {
      const payload = action.payload;
      const updatedProduct = payload.product;
      const updatedProductId = payload.id;

      const updateProduct = state.products.find(
        (product) => product.id === updatedProductId,
      );

      const updateProductIndex = state.products.indexOf(updateProduct);

      updateProduct.title = updatedProduct.title;
      updateProduct.description = updatedProduct.description;
      updateProduct.cost = updatedProduct.cost;

      state.products[updateProductIndex] = updateProduct;

      const updateUserProduct = state.userProducts.find(
        (product) => product.id === updatedProductId,
      );

      const updateUserProductIndex = state.userProducts.indexOf(updateProduct);

      updateUserProduct.title = updateUserProduct.title;
      updateUserProduct.description = updateUserProduct.description;
      updateUserProduct.cost = updateUserProduct.cost;

      state.userProducts[updateUserProductIndex] = updateUserProduct;

      return {
        ...state,
        products: [...state.products],
        userProducts: [...state.userProducts],
      };
    }

    case DELETE_PRODUCT: {
      const payload = action.payload;
      const id = payload.id;

      return {
        ...state,
        products: state.products.filter((product) => product.id !== id),
        userProducts: state.userProducts.filter((product) => product.id !== id),
      };
    }

    default: {
      return state;
    }
  }
};

export default productsReducer;
