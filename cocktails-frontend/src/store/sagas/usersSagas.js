import {takeEvery} from "redux-saga/effects";
import {
  registerUserRequest,
  registerUserFailure,
  registerUserSuccess,
  logoutUserRequest,
  logoutUserSuccess,
  loginUserRequest,
  loginUserSuccess,
  loginUserFailure,
  clearUserErrorsSuccess,
  clearUserErrorsRequest,
  logoutUserFailure, facebookLoginRequest,
} from "../actions/usersActions";
import axiosApi from "../../axiosApi";
import {put} from 'redux-saga/effects';
import {toast} from "react-toastify";

export function* registerUserSaga({payload: userData}) {
  try {
    const response = yield axiosApi.post('/users', userData);
    yield put(registerUserSuccess(response.data));
    toast.success('Registered successful!');
  } catch (error) {
    toast.error(error.response.data.global);
    yield put(registerUserFailure(error.response.data));
  }
}

export function* loginUserSaga({payload: userData}) {
  try {
    const response = yield axiosApi.post('/users/sessions', userData);
    yield put(loginUserSuccess(response.data));
    toast.success('Login successful!', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  } catch (error) {
    toast.error(error.response.data.global);
    yield put(loginUserFailure(error.response.data));
  }
}

export function* logoutUserSaga (state) {
  const headers = {
    'Authorization': state.token,
  };

  try {
    yield axiosApi.delete('/users/sessions', {headers});
    yield put(logoutUserSuccess());
    toast.success('You have successfully logged out', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  } catch (error){
    toast.error(error.response.data.global);
    yield put(logoutUserFailure(error.response.data));
  }
}

export function* facebookLoginSagas ({payload: data}) {
  try{
    const response = yield axiosApi.post('/users/facebookLogin', data);
    yield put(loginUserSuccess(response.data.user));
    toast.success('Login successful', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  } catch (error){
    yield put(loginUserFailure(error));
  }
}

export function* clearUserErrorsSaga () {
 try{
   yield put(clearUserErrorsSuccess());
 } catch (e){
   console.log(e);
 }
}

const usersSaga = [
    takeEvery(registerUserRequest, registerUserSaga),
    takeEvery(loginUserRequest, loginUserSaga),
    takeEvery(logoutUserRequest, logoutUserSaga),
    takeEvery(clearUserErrorsRequest, clearUserErrorsSaga),
    takeEvery(facebookLoginRequest, facebookLoginSagas),
];

export default usersSaga;