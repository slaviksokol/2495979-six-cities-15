import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {State} from '../state';
import {AuthStatus, StatusLoading} from '../../const';
import {checkAuthAction, loginAction, logoutAction} from '../thunks/user';
import {TUserData} from '../../types';

type InitialState = {
  authorizationStatus: AuthStatus;
  userData: TUserData | null;
}

const initialState: InitialState = {
  authorizationStatus: AuthStatus.Unknown,
  userData: null
};

const userSlice = createSlice({
  extraReducers: (builder) =>
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthStatus.NoAuth;
      })
      .addCase(loginAction.pending, (state) => {
        state.loginLoadingStatus = StatusLoading.Loading;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus = AuthStatus.Auth;
        state.loginLoadingStatus = StatusLoading.Success;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthStatus.NoAuth;
        state.loginLoadingStatus = StatusLoading.Failed;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthStatus.NoAuth;
      }),
  initialState,
  name: 'user',
  reducers: {
    setAuthorization: (state, action: PayloadAction<AuthStatus>) => {
      state.authorizationStatus = action.payload;
    }
  },
});

const userActions = {...userSlice.actions, checkAuthAction, loginAction, logoutAction};
const userSelectors = {
  selectAuthStatus: (state: State) => state[userSlice.name].authorizationStatus,
  selectUserData: (state: State) => state[userSlice.name].userData,
};

export {userSlice, userActions, userSelectors};
