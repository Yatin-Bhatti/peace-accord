
import { takeLatest, call, put } from 'redux-saga/effects';
import { loginSuccess, loginFailure } from '../index';
import { LOGIN_REQUEST, UPDATE_TOKEN_REQUEST } from '../loginProcess/loginProcessTypes';
import { HIDE_LOADER, SHOW_LOADER } from "../loader/loaderType";
import { SKIP_CONFERMATION } from '../registrationFlow/registrationFlowTypes';



function* loginSaga(action) {
const navigate=action.navigate;
  try {
    yield put({type:SHOW_LOADER})
    const response = yield call(fetch,"https://peace-accord-api-0d93a6880046.herokuapp.com/account/login/",{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify(action.payload),
    });
    const data = yield call([response, 'json']);
    // console.log(data)

    const { success, token } = data;

    if (success === 'True' && token) {

      yield put(loginSuccess(data));
      localStorage.setItem("authTokens",JSON.stringify(token))
      localStorage.setItem("userInfo",JSON.stringify(data))
      yield put({type:SKIP_CONFERMATION})
      window.location.href = "/"
    } else {
      
      yield put(loginFailure('Login failed. Please check your credentials.'));
      alert('Login failed. Please check your credentials.')
    }
  } catch (error) {
    
    console.log(error)
    yield put(loginFailure(error));
    alert("Something went wrong! Please try again.")
  }finally{
    yield put({type:HIDE_LOADER})
}
}
function*updateTokenSaga(action){
console.log(action.payload);
}


function* watchLoginSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(UPDATE_TOKEN_REQUEST,updateTokenSaga);
}
export default watchLoginSaga;
