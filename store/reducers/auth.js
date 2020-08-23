import {SIGN_IN} from '../actions/auth';

const initialState = {
  uid: null,
  name: null,
  email: null,
  photoURL: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN: {
      const payload = action.payload;

      return {
        ...state,
        uid: payload.uid,
        name: payload.name,
        email: payload.email,
        photoURL: payload.photoURL,
      };
    }

    default: {
      return state;
    }
  }
};

export default authReducer;
