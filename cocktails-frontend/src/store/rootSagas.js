import {all} from 'redux-saga/effects';
import userSaga from "./sagas/usersSagas";
import cocktailsSaga from "./sagas/cocktailsSagas";

export function* rootSagas() {
  yield all([
      ...userSaga,
      ...cocktailsSaga,
  ])
}