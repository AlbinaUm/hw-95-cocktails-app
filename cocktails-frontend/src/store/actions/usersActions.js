import usersSlice from "../slices/usersSlice";

export const {
  facebookRegisterRequest,
  facebookRegisterSuccess,
  facebookRegisterFailure,
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
