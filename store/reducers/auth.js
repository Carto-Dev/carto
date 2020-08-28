import {SIGN_IN, SIGN_OUT} from '../actions/auth';

const initialState = {
  uid: null,
  name: null,
  email: null,
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
      };
    }

    case SIGN_OUT: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};

export default authReducer;
