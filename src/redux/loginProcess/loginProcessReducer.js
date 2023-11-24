import { LOGIN_SUCCESS, LOGIN_FAILURE, UPDATE_TOKEN,RESET_STATE } from './loginProcessTypes';

const initialState = {
  token: (() => {
    const storedToken = localStorage.getItem("authTokens");
    return storedToken ? JSON.parse(storedToken) : null;
  })(),
  error: null,
  user: (() => {
    const userObject = localStorage.getItem("userInfo");
    return userObject ? JSON.parse(userObject).name : null;
  })(),
};

const loginProcessReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token.token,
        user:action.payload.token.name,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        token: null,
        error: action.payload.error,
      };
    case UPDATE_TOKEN:{
      return {
        ...state,
        token:{
          ...state.token,
          access:action.payload
        }
      }
    }
    case RESET_STATE:{
      return {
        ...state,
        token:null,
        user:null
      }
    }
    default:
      return state;
  }
};

export default loginProcessReducer;