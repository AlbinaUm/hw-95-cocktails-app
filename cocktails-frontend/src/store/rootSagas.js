import {all} from 'redux-saga/effects';
import userSaga from "./sagas/usersSagas";

export function* rootSagas() {
  yield all([
      ...userSaga,
  ])
}