import usersSlice from "../slices/usersSlice";

export const {
  registerUserRequest,
  registerUserSuccess,
  registerUserFailure,
  loginUserRequest,
  loginUserSuccess,
  loginUserFailure,
  logoutUserRequest,
  logoutUserSuccess,
  logoutUserFailure,
  clearUserErrorsRequest,
  clearUserErrorsSuccess,
  facebookLoginRequest,
} = usersSlice.actions;
