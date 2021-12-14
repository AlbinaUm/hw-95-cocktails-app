import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginError: null,
  loginLoading: false,
  logoutError: null,
  logoutLoading: false,
  clearUserErrorsLoading: false,
};

const name = 'users';

const usersSlice = createSlice({
  name,
  initialState,
  reducers: {
    registerUserRequest(state) {
      state.registerLoading = true;
    },
    registerUserSuccess(state, {payload: userData}) {
      state.user = userData;
      state.registerLoading = false;
      state.registerError = null;
    },
    registerUserFailure(state, action) {
      state.registerLoading = false;
      state.registerError = action.payload;
    },
    loginUserRequest (state) {
      state.loginLoading = true;
    },
    loginUserSuccess(state, {payload: userData}) {
      state.user = userData;
      state.loginLoading = false;
      state.loginError = null;
    },
    loginUserFailure(state, action) {
      state.loginLoading = false;
      state.loginError = action.payload;
    },
    logoutUserRequest(state) {
      state.logoutLoading = true;
    },
    logoutUserSuccess(state){
      state.user = null;
      state.logoutLoading = false;
    },
    logoutUserFailure(state, action){
      state.loading = false;
      state.logoutError = action.payload;
    },
    facebookLoginRequest (state) {
      state.loginLoading = true;
    },
    clearUserErrorsRequest(state){
      state.clearUserErrorsLoading = true;
    },
    clearUserErrorsSuccess(state){
      state.loginError = null;
      state.registerError = null;
      state.logoutError = null;
      state.subscribeError = null;
      state.clearUserErrorsLoading = false;
    },
  }
});

export default usersSlice;