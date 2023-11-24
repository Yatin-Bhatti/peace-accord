import { all } from 'redux-saga/effects';
import {watchRegister} from "./RegistrationSaga"
import watchLoginSaga from './LoginSaga';

export default function* rootSaga() {
  yield all([
    watchRegister(),
    watchLoginSaga()
  ]);
}