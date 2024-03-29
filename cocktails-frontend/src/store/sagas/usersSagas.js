import {takeEvery} from "redux-saga/effects";
import {
  logoutUserRequest,
  logoutUserSuccess,
  loginUserRequest,
  loginUserSuccess,
  loginUserFailure,
  clearUserErrorsSuccess,
  clearUserErrorsRequest,
  logoutUserFailure, facebookLoginRequest, facebookRegisterSuccess, facebookRegisterFailure, facebookRegisterRequest,
} from "../actions/usersActions";
import axiosApi from "../../axiosApi";
import {put} from 'redux-saga/effects';
import {toast} from "react-toastify";

export function* facebookRegisterSagas ({payload: data}) {
  try{
    const response = yield axiosApi.post('/users/facebookLogin', data);
    yield put(facebookRegisterSuccess(response.data.user));
    toast.success('Login successful', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  } catch (error){
    yield put(facebookRegisterFailure(error));
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
    yield put(loginUserFailure(error.response.data));

    if (error.response.data.global){
      toast.error(error.response.data.global);
    } else {
      toast.error(error);
    }
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
    yield put(logoutUserFailure(error.response.data));

    if (error.response.data.global) toast.error(error.response.data.global);
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
    yield put(loginUserFailure(error.response.data));

    if (error.response.data.global){
      toast.error(error.response.data.global);
    }
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
    takeEvery(facebookRegisterRequest, facebookRegisterSagas),
    takeEvery(loginUserRequest, loginUserSaga),
    takeEvery(logoutUserRequest, logoutUserSaga),
    takeEvery(clearUserErrorsRequest, clearUserErrorsSaga),
    takeEvery(facebookLoginRequest, facebookLoginSagas),
];

export default usersSaga;