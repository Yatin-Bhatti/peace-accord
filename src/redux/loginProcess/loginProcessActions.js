import {LOGIN_FAILURE,LOGIN_REQUEST,LOGIN_SUCCESS,RESET_STATE,UPDATE_TOKEN,UPDATE_TOKEN_REQUEST} from "./loginProcessTypes"

export const loginRequest = (email, password,navigate) => ({
    type: LOGIN_REQUEST,
    payload: { email: email, password: password },
    navigate:navigate
  });

  export const updateTokenRequest=(refreshToken)=>({
    type:UPDATE_TOKEN_REQUEST,
    payload:{refresh:refreshToken}
  })
  
  export const loginSuccess = (token) => ({
    type: LOGIN_SUCCESS,
    payload: { token },
  });
  
  export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: { error },
  });
  export const updateToken=(updatedToken)=>({
    type:UPDATE_TOKEN,
    payload:updatedToken
  })
  export const resetState=()=>({
    type:RESET_STATE,
  })